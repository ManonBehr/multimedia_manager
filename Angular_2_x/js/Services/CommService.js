System.register(["@angular/core", "@angular/http", "./utils", "rxjs/Observable", "rxjs/add/operator/map"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, utils_1, Observable_1;
    var initDone, CommService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            initDone = false;
            CommService = class CommService {
                constructor(_http) {
                    this._http = _http;
                    this.mediaRenderers = [];
                    this.mediaServers = [];
                    this.parser = new DOMParser();
                }
                init(origin) {
                    origin = origin || location.origin;
                    if (initDone) {
                        throw "Cannot instantiate CommService multiple times...";
                    }
                    else {
                        initDone = true;
                    }
                    utils_1.utils.initIO(`${origin}/m2m`);
                    return this._http.get(`${origin}/getContext`).map((response) => {
                        if (response.status !== 200) {
                            console.error("Impossible to get context:", response);
                            return;
                        }
                        let context = JSON.parse(response.text());
                        for (let i in context.bricks) {
                            this.onbrickAppear(context.bricks[i]);
                        }
                        utils_1.utils.io.on("brickAppears", (brick) => {
                            console.log("brickAppears", brick);
                            this.onbrickAppear(brick);
                        });
                        utils_1.utils.io.on("brickDisappears", (data) => {
                            console.log("brick brickDisappears", data.brickId);
                            let index, hasId = function (brick, i) { index = i; return brick.id === data.brickId; };
                            if (this.mediaRenderers.find(hasId)) {
                                this.mediaRenderers.splice(index, 1);
                                if (this.onupdate) {
                                    this.onupdate("disappear", "BrickUPnP_MediaRenderer", data.brickId);
                                }
                            }
                            if (this.mediaServers.find(hasId)) {
                                this.mediaServers.splice(index, 1);
                                if (this.onupdate) {
                                    this.onupdate("disappear", "BrickUPnP_MediaServer", data.brickId);
                                }
                            }
                        });
                        return { mediaRenderers: this.mediaRenderers, mediaServers: this.mediaServers };
                    });
                }
                onbrickAppear(brick) {
                    if (brick.type.indexOf("BrickUPnP_MediaRenderer") >= 0) {
                        this.mediaRenderers.push(brick);
                        if (this.onupdate) {
                            this.onupdate("appear", "BrickUPnP_MediaRenderer", brick);
                        }
                    }
                    if (brick.type.indexOf("BrickUPnP_MediaServer") >= 0) {
                        this.mediaServers.push(brick);
                        if (this.onupdate) {
                            this.onupdate("appear", "BrickUPnP_MediaServer", brick);
                        }
                    }
                }
                call(objectId, method, params, cb) {
                    return utils_1.utils.call(objectId, method, params);
                }
                play(mediaRendererId) {
                    return utils_1.utils.call(mediaRendererId, "Play", []);
                }
                pause(mediaRendererId) {
                    return utils_1.utils.call(mediaRendererId, "Pause", []);
                }
                stop(mediaRendererId) {
                    return utils_1.utils.call(mediaRendererId, "Stop", []);
                }
                setVolume(mediaRendererId, volume) {
                    return utils_1.utils.call(mediaRendererId, "setVolume", [volume]);
                }
                loadMedia(mediaRendererId, mediaServerId, itemId) {
                    return utils_1.utils.call(mediaRendererId, "loadMedia", [mediaServerId, itemId]);
                }
                subscribe(brickId, eventName = "eventUPnP") {
                    return Observable_1.Observable.create((observer) => {
                        utils_1.utils.subscribeBrick(brickId, eventName, (data) => {
                            //console.log( "utils event", data );
                            observer.next(data);
                        });
                    });
                }
                getMediaFromDIDL(descr) {
                    let media, item;
                    if (typeof descr === "string") {
                        let doc = this.parser.parseFromString(descr, "text/xml");
                        item = doc ? doc.querySelector("item") : null;
                    }
                    else {
                        item = descr;
                    }
                    if (item) {
                        let node;
                        let res = item.querySelector("res");
                        media = {
                            serverId: undefined,
                            date: (node = item.querySelector("date")) ? node.textContent : "inconnue",
                            title: (node = item.querySelector("title")) ? node.textContent : "inconnu",
                            icon: (node = item.querySelector("icon")) ? node.textContent : "images/media_icon.jpg",
                            mediaId: item.getAttribute("id"),
                            creator: (node = item.querySelector("creator")) ? node.textContent : "inconnu",
                            actors: [],
                            genres: [],
                            albumarturi: (node = item.querySelector("albumarturi, albumArtURI, albumArtUri")) ? node.textContent : "",
                            description: (node = item.querySelector("description")) ? node.textContent : "",
                            longdescription: (node = item.querySelector("longdescription, longDescription")) ? node.textContent : "",
                            ressource: res ? res.textContent : "",
                            duration: res ? (res.getAttribute("duration") || "") : "",
                            size: res ? (+res.getAttribute("size") || 0) : 0,
                            resolution: res ? (res.getAttribute("resolution") || "") : "",
                            bitrate: res ? (+res.getAttribute("bitrate") || 0) : 0,
                            nrAudioChannels: res ? (+res.getAttribute("nrAudioChannels") || 0) : 0,
                            protocolInfo: res ? (res.getAttribute("protocolInfo") || "") : "",
                            classe: (node = item.querySelector("class")) ? node.textContent : ""
                        };
                        for (let actor of item.querySelectorAll("actor")) {
                            media.actors.push(actor.textContent);
                        }
                        for (let genre of item.querySelectorAll("genre")) {
                            media.genres.push(genre.textContent);
                        }
                    }
                    console.log("media =>", media);
                    return media;
                }
                browse(mediaServerId, directoryId = "0") {
                    return utils_1.utils.call(mediaServerId, "Browse", [directoryId]).then((dataString) => {
                        let dataBrowse = {
                            parentDirectory: directoryId,
                            directories: [],
                            medias: [],
                            error: null
                        };
                        try {
                            let doc = this.parser.parseFromString(dataString, "text/xml");
                            let Result = doc.querySelector("Result");
                            let ResultDoc = this.parser.parseFromString(Result.textContent, "text/xml");
                            // Parse containers
                            for (let container of ResultDoc.querySelectorAll("container")) {
                                let node;
                                dataBrowse.directories.push({
                                    serverId: mediaServerId,
                                    name: (node = container.querySelector("title")) ? node.textContent : "inconnu",
                                    iconURL: (node = container.querySelector("albumArtURI")) ? node.textContent : "",
                                    directoryId: container.getAttribute("id") });
                            } // End of containers parsing
                            // Parse item
                            for (let item of ResultDoc.querySelectorAll("item")) {
                                let media = this.getMediaFromDIDL(item);
                                media.serverId = mediaServerId;
                                if (media) {
                                    dataBrowse.medias.push(media);
                                }
                            } // End of items parsing
                        }
                        catch (err) {
                            dataBrowse.error = err;
                        }
                        return dataBrowse;
                    });
                }
            };
            CommService = __decorate([
                core_1.Injectable(), 
                __metadata('design:paramtypes', [http_1.Http])
            ], CommService);
            exports_1("CommService", CommService);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlcnZpY2VzL0NvbW1TZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7UUFxRUksUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFBUixRQUFRLEdBQUcsS0FBSyxDQUFDO1lBRXJCO2dCQUtJLFlBQW9CLEtBQVc7b0JBQVgsVUFBSyxHQUFMLEtBQUssQ0FBTTtvQkFKL0IsbUJBQWMsR0FBc0IsRUFBRSxDQUFDO29CQUN2QyxpQkFBWSxHQUF3QixFQUFFLENBQUM7b0JBSW5DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztnQkFDbEMsQ0FBQztnQkFDRCxJQUFJLENBQUUsTUFBZTtvQkFDakIsTUFBTSxHQUFHLE1BQU0sSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDO29CQUNuQyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3dCQUFBLE1BQU0sa0RBQWtELENBQUM7b0JBQUEsQ0FBQztvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFBQSxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUFBLENBQUM7b0JBQ2hHLGFBQUssQ0FBQyxNQUFNLENBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBRSxDQUFDO29CQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLGFBQWEsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxDQUFDLFFBQVE7d0JBQ3hELEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFBQSxPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixFQUFFLFFBQVEsQ0FBQyxDQUFDOzRCQUFDLE1BQU0sQ0FBQzt3QkFBQSxDQUFDO3dCQUM1RixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBRSxDQUFDO3dCQUM1QyxHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFB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RyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ3hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDO2dDQUMvQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29DQUNSLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUNsQyxDQUFDOzRCQUNMLENBQUMsQ0FBQyx1QkFBdUI7d0JBQzdCLENBQUU7d0JBQUEsS0FBSyxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFBQSxVQUFVLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQzt3QkFBQSxDQUFDO3dCQUN0QyxNQUFNLENBQUMsVUFBVSxDQUFDO29CQUMxQixDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQUEsQ0FBQztZQTFKRjtnQkFBQyxpQkFBVSxFQUFFOzsyQkFBQTtZQUNiLHFDQXlKRSxDQUFBIiwiZmlsZSI6IlNlcnZpY2VzL0NvbW1TZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0h0dHB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyB1dGlscyB9IGZyb20gXCIuL3V0aWxzXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcbmltcG9ydCB7T2JzZXJ2ZXJ9IGZyb20gXCJyeGpzL09ic2VydmVyXCI7XG4vLyBpbXBvcnQgXCJyeGpzL1J4XCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9tYXBcIjtcblxuLy8gZXhwb3J0XG5leHBvcnQgaW50ZXJmYWNlIEJyaWNrIHtcbiAgICBpZCAgICAgIDogc3RyaW5nO1xuICAgIG5hbWUgICAgOiBzdHJpbmc7XG4gICAgdHlwZSAgICA6IHN0cmluZ1tdO1xufVxuZXhwb3J0IGludGVyZmFjZSBNZWRpYVJlbmRlcmVyIGV4dGVuZHMgQnJpY2sge1xuICAgIGljb25VUkwgOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhU2VydmVyICAgZXh0ZW5kcyBCcmljayB7XG4gICAgaWNvblVSTCAgICAgOiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIERhdGFEbG5hRGV2aWNlcyB7XG4gICAgbWVkaWFSZW5kZXJlcnMgIDogTWVkaWFSZW5kZXJlcltdO1xuICAgIG1lZGlhU2VydmVycyAgICA6IE1lZGlhU2VydmVyICBbXTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3Rvcnkge1xuICAgIHNlcnZlcklkICAgIDogc3RyaW5nO1xuICAgIG5hbWUgICAgICAgIDogc3RyaW5nO1xuICAgIGljb25VUkwgICAgIDogc3RyaW5nO1xuICAgIGRpcmVjdG9yeUlkIDogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3NvdXJjZSB7XG4gICAgZHVyYXRpb24gICAgICAgIDogc3RyaW5nOyAgIC8vIGV4OiAxOjQ1OjE5LjAwMFxuICAgIHNpemUgICAgICAgICAgICA6IG51bWJlcjtcbiAgICByZXNvbHV0aW9uICAgICAgOiBzdHJpbmc7ICAgLy8gZXg6IDcyMHgzMDRcbiAgICBiaXRyYXRlICAgICAgICAgOiBudW1iZXI7XG4gICAgbnJBdWRpb0NoYW5uZWxzIDogbnVtYmVyO1xuICAgIHByb3RvY29sSW5mbyAgICA6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYSB7XG4gICAgc2VydmVySWQgICAgICAgIDogc3RyaW5nO1xuICAgIGRhdGUgICAgICAgICAgICA6IHN0cmluZztcbiAgICB0aXRsZSAgICAgICAgICAgOiBzdHJpbmc7XG4gICAgaWNvbiAgICAgICAgICAgIDogc3RyaW5nO1xuICAgIG1lZGlhSWQgICAgICAgICA6IHN0cmluZztcbiAgICBjcmVhdG9yICAgICAgICAgOiBzdHJpbmc7XG4gICAgYWN0b3JzICAgICAgICAgIDogc3RyaW5nW107XG4gICAgZ2VucmVzICAgICAgICAgIDogc3RyaW5nW107XG4gICAgYWxidW1hcnR1cmkgICAgIDogc3RyaW5nO1xuICAgIGRlc2NyaXB0aW9uICAgICA6IHN0cmluZztcbiAgICBsb25nZGVzY3JpcHRpb24gOiBzdHJpbmc7XG4gICAgcmVzc291cmNlICAgICAgIDogc3RyaW5nO1xuICAgIGR1cmF0aW9uICAgICAgICA6IHN0cmluZzsgICAvLyBleDogMTo0NToxOS4wMDBcbiAgICBzaXplICAgICAgICAgICAgOiBudW1iZXI7XG4gICAgcmVzb2x1dGlvbiAgICAgIDogc3RyaW5nOyAgIC8vIGV4OiA3MjB4MzA0XG4gICAgYml0cmF0ZSAgICAgICAgIDogbnVtYmVyO1xuICAgIG5yQXVkaW9DaGFubmVscyA6IG51bWJlcjtcbiAgICBwcm90b2NvbEluZm8gICAgOiBzdHJpbmc7XG4gICAgY2xhc3NlICAgICAgICAgIDogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBEYXRhQnJvd3NlIHtcbiAgICBwYXJlbnREaXJlY3RvcnkgOiBzdHJpbmc7XG4gICAgZGlyZWN0b3JpZXMgICAgIDogRGlyZWN0b3J5W107XG4gICAgbWVkaWFzICAgICAgICAgIDogTWVkaWFbXTtcbiAgICBlcnJvciAgICAgICAgICAgOiBzdHJpbmc7XG59XG5cbmxldCBpbml0RG9uZSA9IGZhbHNlO1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbW1TZXJ2aWNlIHtcbiAgICBtZWRpYVJlbmRlcmVycyAgOiBNZWRpYVJlbmRlcmVyW10gPSBbXTtcbiAgICBtZWRpYVNlcnZlcnMgICAgOiBNZWRpYVNlcnZlciAgW10gPSBbXTtcbiAgICBvbnVwZGF0ZSAgICAgICAgOiAob3BlcmF0aW9uOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYnJpY2s6IE1lZGlhUmVuZGVyZXIgfCBNZWRpYVNlcnZlcikgPT4gdm9pZDtcbiAgICBwcml2YXRlIHBhcnNlclx0OiBET01QYXJzZXI7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDogSHR0cCkge1xuICAgICAgICB0aGlzLnBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICB9XG4gICAgaW5pdCggb3JpZ2luPzogc3RyaW5nICkgOiBPYnNlcnZhYmxlPERhdGFEbG5hRGV2aWNlcz4ge1xuICAgICAgICBvcmlnaW4gPSBvcmlnaW4gfHwgbG9jYXRpb24ub3JpZ2luO1xuICAgICAgICBpZihpbml0RG9uZSkge3Rocm93IFwiQ2Fubm90IGluc3RhbnRpYXRlIENvbW1TZXJ2aWNlIG11bHRpcGxlIHRpbWVzLi4uXCI7fSBlbHNlIHtpbml0RG9uZSA9IHRydWU7fVxuICAgICAgICB1dGlscy5pbml0SU8oIGAke29yaWdpbn0vbTJtYCApO1xuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoYCR7b3JpZ2lufS9nZXRDb250ZXh0YCkubWFwKCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7Y29uc29sZS5lcnJvcihcIkltcG9zc2libGUgdG8gZ2V0IGNvbnRleHQ6XCIsIHJlc3BvbnNlKTsgcmV0dXJuO31cbiAgICAgICAgICAgIGxldCBjb250ZXh0ID0gSlNPTi5wYXJzZSggcmVzcG9uc2UudGV4dCgpICk7XG4gICAgICAgICAgICBmb3IobGV0IGkgaW4gY29udGV4dC5icmlja3MgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmJyaWNrQXBwZWFyKCBjb250ZXh0LmJyaWNrc1tpXSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXRpbHMuaW8ub25cdCggXCJicmlja0FwcGVhcnNcIiwgKGJyaWNrOiBNZWRpYVJlbmRlcmVyIHwgTWVkaWFTZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggXCJicmlja0FwcGVhcnNcIiwgYnJpY2sgKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uYnJpY2tBcHBlYXIoIGJyaWNrICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHV0aWxzLmlvLm9uXHQoIFwiYnJpY2tEaXNhcHBlYXJzXCIsICggZGF0YSApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImJyaWNrIGJyaWNrRGlzYXBwZWFyc1wiLCBkYXRhLmJyaWNrSWQpO1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCwgaGFzSWQgPSBmdW5jdGlvbihicmljaywgaSkge2luZGV4ID0gaTsgcmV0dXJuIGJyaWNrLmlkID09PSBkYXRhLmJyaWNrSWQ7fTtcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5tZWRpYVJlbmRlcmVycy5maW5kKCBoYXNJZCApICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lZGlhUmVuZGVyZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMub251cGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub251cGRhdGUoXCJkaXNhcHBlYXJcIiwgXCJCcmlja1VQblBfTWVkaWFSZW5kZXJlclwiLCBkYXRhLmJyaWNrSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLm1lZGlhU2VydmVycy5maW5kICAoIGhhc0lkICkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVkaWFTZXJ2ZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMub251cGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub251cGRhdGUoIFwiZGlzYXBwZWFyXCIsIFwiQnJpY2tVUG5QX01lZGlhU2VydmVyXCIgICwgZGF0YS5icmlja0lkICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB7bWVkaWFSZW5kZXJlcnM6IHRoaXMubWVkaWFSZW5kZXJlcnMsIG1lZGlhU2VydmVyczogdGhpcy5tZWRpYVNlcnZlcnN9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25icmlja0FwcGVhcihicmljazogTWVkaWFSZW5kZXJlciB8IE1lZGlhU2VydmVyKSA6IHZvaWQge1xuICAgICAgICBpZiggYnJpY2sudHlwZS5pbmRleE9mKFwiQnJpY2tVUG5QX01lZGlhUmVuZGVyZXJcIikgPj0gMCApIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFSZW5kZXJlcnMucHVzaCggPE1lZGlhUmVuZGVyZXI+YnJpY2sgKTtcbiAgICAgICAgICAgIGlmKHRoaXMub251cGRhdGUpIHt0aGlzLm9udXBkYXRlKCBcImFwcGVhclwiLCBcIkJyaWNrVVBuUF9NZWRpYVJlbmRlcmVyXCIsIGJyaWNrICk7fVxuICAgICAgICB9XG4gICAgICAgIGlmKCBicmljay50eXBlLmluZGV4T2YoXCJCcmlja1VQblBfTWVkaWFTZXJ2ZXJcIikgPj0gMCApIHtcbiAgICAgICAgICAgIHRoaXMubWVkaWFTZXJ2ZXJzLnB1c2goIDxNZWRpYVNlcnZlcj5icmljayApO1xuICAgICAgICAgICAgaWYodGhpcy5vbnVwZGF0ZSkge3RoaXMub251cGRhdGUoIFwiYXBwZWFyXCIsIFwiQnJpY2tVUG5QX01lZGlhU2VydmVyXCIsIGJyaWNrICk7fVxuICAgICAgICB9XG4gICAgfVxuICAgIGNhbGwob2JqZWN0SWQ6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIHBhcmFtczogYW55W10sIGNiPzooZGF0YTogYW55KT0+dm9pZCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdXRpbHMuY2FsbChvYmplY3RJZCwgbWV0aG9kLCBwYXJhbXMpO1xuICAgIH1cbiAgICBwbGF5KG1lZGlhUmVuZGVyZXJJZDogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB1dGlscy5jYWxsKG1lZGlhUmVuZGVyZXJJZCwgXCJQbGF5XCIgLCBbXSk7XG4gICAgfVxuICAgIHBhdXNlKG1lZGlhUmVuZGVyZXJJZDogc3RyaW5nKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB1dGlscy5jYWxsKG1lZGlhUmVuZGVyZXJJZCwgXCJQYXVzZVwiLCBbXSk7XG4gICAgfVxuICAgIHN0b3AobWVkaWFSZW5kZXJlcklkOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNhbGwobWVkaWFSZW5kZXJlcklkLCBcIlN0b3BcIiwgW10pO1xuICAgIH1cbiAgICBzZXRWb2x1bWUobWVkaWFSZW5kZXJlcklkOiBzdHJpbmcsIHZvbHVtZTogbnVtYmVyKSA6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHJldHVybiB1dGlscy5jYWxsKG1lZGlhUmVuZGVyZXJJZCwgXCJzZXRWb2x1bWVcIiwgW3ZvbHVtZV0pO1xuICAgIH1cbiAgICBsb2FkTWVkaWEobWVkaWFSZW5kZXJlcklkOiBzdHJpbmcsIG1lZGlhU2VydmVySWQ6IHN0cmluZywgaXRlbUlkOiBzdHJpbmcpIDogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNhbGwobWVkaWFSZW5kZXJlcklkLCBcImxvYWRNZWRpYVwiLCBbbWVkaWFTZXJ2ZXJJZCwgaXRlbUlkXSk7XG4gICAgfVxuICAgIHN1YnNjcmliZShicmlja0lkOiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nID0gXCJldmVudFVQblBcIikgOiBPYnNlcnZhYmxlPE9iamVjdD4ge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoIChvYnNlcnZlcjogT2JzZXJ2ZXI8T2JqZWN0PikgPT4ge1xuICAgICAgICAgICAgdXRpbHMuc3Vic2NyaWJlQnJpY2soYnJpY2tJZCwgZXZlbnROYW1lLCAoZGF0YTogT2JqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyggXCJ1dGlscyBldmVudFwiLCBkYXRhICk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dCggZGF0YSApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRNZWRpYUZyb21ESURMKCBkZXNjcjogc3RyaW5nIHwgRWxlbWVudCApIDogTWVkaWEge1xuICAgICAgICBsZXQgbWVkaWEgOiBNZWRpYSwgaXRlbSA6IEVsZW1lbnQ7XG4gICAgICAgIGlmKHR5cGVvZiBkZXNjciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgbGV0IGRvYyAgID0gdGhpcy5wYXJzZXIucGFyc2VGcm9tU3RyaW5nKCBkZXNjciwgXCJ0ZXh0L3htbFwiICk7XG4gICAgICAgICAgICBpdGVtID0gZG9jP2RvYy5xdWVyeVNlbGVjdG9yKFwiaXRlbVwiKTpudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbSA9IGRlc2NyO1xuICAgICAgICB9XG4gICAgICAgIGlmKGl0ZW0pIHtcbiAgICAgICAgICAgIGxldCBub2RlOiBFbGVtZW50O1xuICAgICAgICAgICAgbGV0IHJlcyA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcInJlc1wiKTtcbiAgICAgICAgICAgIG1lZGlhID0ge1xuICAgICAgICAgICAgICAgIHNlcnZlcklkICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBkYXRlICAgICAgICAgICAgOiAobm9kZT1pdGVtLnF1ZXJ5U2VsZWN0b3IoXCJkYXRlXCIpKT9ub2RlLnRleHRDb250ZW50OlwiaW5jb25udWVcIixcbiAgICAgICAgICAgICAgICB0aXRsZSAgICAgICAgICAgOiAobm9kZT1pdGVtLnF1ZXJ5U2VsZWN0b3IoXCJ0aXRsZVwiKSk/bm9kZS50ZXh0Q29udGVudDpcImluY29ubnVcIixcbiAgICAgICAgICAgICAgICBpY29uICAgICAgICAgICAgOiAobm9kZT1pdGVtLnF1ZXJ5U2VsZWN0b3IoXCJpY29uXCIpKT9ub2RlLnRleHRDb250ZW50OlwiaW1hZ2VzL21lZGlhX2ljb24uanBnXCIsXG4gICAgICAgICAgICAgICAgbWVkaWFJZCAgICAgICAgIDogaXRlbS5nZXRBdHRyaWJ1dGUoXCJpZFwiKSxcbiAgICAgICAgICAgICAgICBjcmVhdG9yICAgICAgICAgOiAobm9kZT1pdGVtLnF1ZXJ5U2VsZWN0b3IoXCJjcmVhdG9yXCIpKT9ub2RlLnRleHRDb250ZW50OlwiaW5jb25udVwiLFxuICAgICAgICAgICAgICAgIGFjdG9ycyAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgICAgIGdlbnJlcyAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgICAgIGFsYnVtYXJ0dXJpICAgICA6IChub2RlPWl0ZW0ucXVlcnlTZWxlY3RvcihcImFsYnVtYXJ0dXJpLCBhbGJ1bUFydFVSSSwgYWxidW1BcnRVcmlcIikpP25vZGUudGV4dENvbnRlbnQ6XCJcIixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbiAgICAgOiAobm9kZT1pdGVtLnF1ZXJ5U2VsZWN0b3IoXCJkZXNjcmlwdGlvblwiKSk/bm9kZS50ZXh0Q29udGVudDpcIlwiLFxuICAgICAgICAgICAgICAgIGxvbmdkZXNjcmlwdGlvbiA6IChub2RlPWl0ZW0ucXVlcnlTZWxlY3RvcihcImxvbmdkZXNjcmlwdGlvbiwgbG9uZ0Rlc2NyaXB0aW9uXCIpKT9ub2RlLnRleHRDb250ZW50OlwiXCIsXG4gICAgICAgICAgICAgICAgcmVzc291cmNlICAgICAgIDogcmVzP3Jlcy50ZXh0Q29udGVudDpcIlwiLFxuICAgICAgICAgICAgICAgIGR1cmF0aW9uICAgICAgICA6IHJlcz8oIHJlcy5nZXRBdHRyaWJ1dGUoXCJkdXJhdGlvblwiICAgICAgICl8fFwiXCIpOlwiXCIsXG4gICAgICAgICAgICAgICAgc2l6ZSAgICAgICAgICAgIDogcmVzPygrcmVzLmdldEF0dHJpYnV0ZShcInNpemVcIiAgICAgICAgICAgKXx8MCApOjAgLFxuICAgICAgICAgICAgICAgIHJlc29sdXRpb24gICAgICA6IHJlcz8oIHJlcy5nZXRBdHRyaWJ1dGUoXCJyZXNvbHV0aW9uXCIgICAgICl8fFwiXCIpOlwiXCIsXG4gICAgICAgICAgICAgICAgYml0cmF0ZSAgICAgICAgIDogcmVzPygrcmVzLmdldEF0dHJpYnV0ZShcImJpdHJhdGVcIiAgICAgICAgKXx8MCApOjAgLFxuICAgICAgICAgICAgICAgIG5yQXVkaW9DaGFubmVscyA6IHJlcz8oK3Jlcy5nZXRBdHRyaWJ1dGUoXCJuckF1ZGlvQ2hhbm5lbHNcIil8fDAgKTowICxcbiAgICAgICAgICAgICAgICBwcm90b2NvbEluZm8gICAgOiByZXM/KCByZXMuZ2V0QXR0cmlidXRlKFwicHJvdG9jb2xJbmZvXCIgICApfHxcIlwiKTpcIlwiLFxuICAgICAgICAgICAgICAgIGNsYXNzZSAgICAgICAgICA6IChub2RlPWl0ZW0ucXVlcnlTZWxlY3RvcihcImNsYXNzXCIpKT9ub2RlLnRleHRDb250ZW50OlwiXCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IobGV0IGFjdG9yIG9mIGl0ZW0ucXVlcnlTZWxlY3RvckFsbCggXCJhY3RvclwiICkpIHtcbiAgICAgICAgICAgICAgICBtZWRpYS5hY3RvcnMucHVzaCggYWN0b3IudGV4dENvbnRlbnQgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcihsZXQgZ2VucmUgb2YgaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCBcImdlbnJlXCIgKSkge1xuICAgICAgICAgICAgICAgIG1lZGlhLmdlbnJlcy5wdXNoKCBnZW5yZS50ZXh0Q29udGVudCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKFwibWVkaWEgPT5cIiwgbWVkaWEpO1xuICAgICAgICByZXR1cm4gbWVkaWE7XG4gICAgfVxuICAgIGJyb3dzZShtZWRpYVNlcnZlcklkOiBzdHJpbmcsIGRpcmVjdG9yeUlkOiBzdHJpbmcgPSBcIjBcIikgOiBQcm9taXNlPERhdGFCcm93c2U+IHtcbiAgICAgICAgcmV0dXJuIHV0aWxzLmNhbGwoIG1lZGlhU2VydmVySWQsIFwiQnJvd3NlXCIsIFtkaXJlY3RvcnlJZF0gKS50aGVuKCAoZGF0YVN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IGRhdGFCcm93c2UgOiBEYXRhQnJvd3NlID0ge1xuICAgICAgICAgICAgICAgIHBhcmVudERpcmVjdG9yeSA6IGRpcmVjdG9yeUlkLFxuICAgICAgICAgICAgICAgIGRpcmVjdG9yaWVzICAgICA6IFtdLFxuICAgICAgICAgICAgICAgIG1lZGlhcyAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgICAgIGVycm9yICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBkb2MgICAgICAgICA9IHRoaXMucGFyc2VyLnBhcnNlRnJvbVN0cmluZyggZGF0YVN0cmluZywgXCJ0ZXh0L3htbFwiICk7XG4gICAgICAgICAgICAgICAgbGV0IFJlc3VsdCAgICAgID0gZG9jLnF1ZXJ5U2VsZWN0b3IoXCJSZXN1bHRcIik7XG4gICAgICAgICAgICAgICAgbGV0IFJlc3VsdERvYyAgID0gdGhpcy5wYXJzZXIucGFyc2VGcm9tU3RyaW5nKFJlc3VsdC50ZXh0Q29udGVudCwgXCJ0ZXh0L3htbFwiKTtcblxuICAgICAgICAgICAgICAgIC8vIFBhcnNlIGNvbnRhaW5lcnNcbiAgICAgICAgICAgICAgICBmb3IobGV0IGNvbnRhaW5lciBvZiBSZXN1bHREb2MucXVlcnlTZWxlY3RvckFsbChcImNvbnRhaW5lclwiKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbm9kZSAgICA6IE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFCcm93c2UuZGlyZWN0b3JpZXMucHVzaCgge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VydmVySWQgICAgOiBtZWRpYVNlcnZlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSAgICAgICAgOiAobm9kZT1jb250YWluZXIucXVlcnlTZWxlY3RvcihcInRpdGxlXCIpKT9ub2RlLnRleHRDb250ZW50OlwiaW5jb25udVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvblVSTCAgICAgOiAobm9kZT1jb250YWluZXIucXVlcnlTZWxlY3RvcihcImFsYnVtQXJ0VVJJXCIpKT9ub2RlLnRleHRDb250ZW50OlwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcnlJZCA6IGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoXCJpZFwiKX0gKTtcbiAgICAgICAgICAgICAgICB9IC8vIEVuZCBvZiBjb250YWluZXJzIHBhcnNpbmdcblxuICAgICAgICAgICAgICAgIC8vIFBhcnNlIGl0ZW1cbiAgICAgICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2YgUmVzdWx0RG9jLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpdGVtXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZWRpYSA9IHRoaXMuZ2V0TWVkaWFGcm9tRElETChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgbWVkaWEuc2VydmVySWQgPSBtZWRpYVNlcnZlcklkO1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFCcm93c2UubWVkaWFzLnB1c2gobWVkaWEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSAvLyBFbmQgb2YgaXRlbXMgcGFyc2luZ1xuICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtkYXRhQnJvd3NlLmVycm9yID0gZXJyO31cbiAgICAgICAgICAgIHJldHVybiBkYXRhQnJvd3NlO1xuICAgIH0pO1xufX1cbiJdLCJzb3VyY2VSb290IjoiIn0=
