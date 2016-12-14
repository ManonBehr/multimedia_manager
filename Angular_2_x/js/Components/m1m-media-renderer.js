System.register(["@angular/core", "../Services/CommService"], function(exports_1, context_1) {
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
    var core_1, CommService_1;
    var PLAY_STATE, M1mMediaRenderer;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            }],
        execute: function() {
            (function (PLAY_STATE) {
                PLAY_STATE[PLAY_STATE["PLAY"] = 0] = "PLAY";
                PLAY_STATE[PLAY_STATE["PAUSE"] = 1] = "PAUSE";
                PLAY_STATE[PLAY_STATE["STOP"] = 2] = "STOP";
            })(PLAY_STATE || (PLAY_STATE = {}));
            M1mMediaRenderer = class M1mMediaRenderer {
                constructor(cs) {
                    this.cs = cs;
                    this.duration = "";
                    this.mute = false;
                    this.volume = 0;
                    this.playState = PLAY_STATE.STOP;
                    // console.log( "CommService:", cs);
                }
                ngOnInit() {
                    this.obsEvent = this.cs.subscribe(this.nf.id);
                    this.obsEvent.subscribe((event) => {
                        let data = event.data;
                        console.log("M1mMediaRenderer UPnP event", event.data.attribut);
                        this.state[data.serviceType][data.attribut] = data.value;
                        this.updateRenderingControl(this.state["urn:schemas-upnp-org:service:RenderingControl:1"]);
                        this.updateAVTransport(this.state["urn:schemas-upnp-org:service:AVTransport:1"]);
                        //
                        if (data.serviceType === "UPnP_Media" && data.attribut === "itemMetadata") {
                            this.currentMedia = this.cs.getMediaFromDIDL(data.value);
                        }
                    });
                    this.cs.call(this.nf.id, "getMediasStates", []).then((state) => {
                        console.log("getMediasStates =>", state);
                        this.state = state;
                        let AVTransport = this.state["urn:schemas-upnp-org:service:AVTransport:1"], RenderingControl = this.state["urn:schemas-upnp-org:service:RenderingControl:1"], UPnP_Media = this.state["UPnP_Media"];
                        this.updateRenderingControl(RenderingControl);
                        this.updateAVTransport(AVTransport);
                        if (UPnP_Media && UPnP_Media.itemMetadata) {
                            this.currentMedia = this.cs.getMediaFromDIDL(UPnP_Media.itemMetadata);
                        }
                    });
                }
                updateRenderingControl(renderingControl) {
                    if (!renderingControl)
                        return;
                    this.mute = renderingControl.Mute === "1" || renderingControl.Mute === "true";
                    this.volume = +renderingControl.Volume;
                }
                updateAVTransport(AVTransport) {
                    if (!AVTransport)
                        return;
                    this.duration = AVTransport.CurrentMediaDuration;
                    switch (AVTransport.TransportState) {
                        case "STOPPED":
                            this.playState = PLAY_STATE.STOP;
                            break;
                        case "PLAYING":
                            this.playState = PLAY_STATE.PLAY;
                            break;
                        case "PAUSED_PLAYBACK":
                            this.playState = PLAY_STATE.PAUSE;
                            break;
                    }
                }
                setVolume(volume) {
                    // console.log( "setVolume", volume );
                    clearTimeout(this.timeoutVol);
                    this.timeoutVol = window.setTimeout(() => this.cs.setVolume(this.nf.id, volume), 50);
                }
                isPlaying() { return this.playState === PLAY_STATE.PLAY; }
                isPaused() { return this.playState === PLAY_STATE.PAUSE; }
                isStopped() { return this.playState === PLAY_STATE.STOP; }
                play() {
                    return this.cs.play(this.nf.id);
                }
                pause() {
                    return this.cs.pause(this.nf.id);
                }
                stop() {
                    return this.cs.stop(this.nf.id);
                }
                isMedia(obj) {
                    console.log("isMedia", obj);
                    return true;
                }
                loadMedia(media) {
                    console.log(this.nf.id, "loadMedia", media.serverId, media.mediaId);
                    this.cs.loadMedia(this.nf.id, media.serverId, media.mediaId).then((rep) => {
                        console.log("rep:", rep);
                        this.play().then(() => {
                            // Subscribe to media server
                        });
                    });
                }
                getIcon(media) {
                    if (media.albumarturi) {
                        return media.albumarturi;
                    }
                    if (media.classe === "object.item.videoItem" && !media.icon) {
                        return "img/film.png";
                    }
                    else if (media.classe === "object.item.audioItem.musicTrack" && !media.icon) {
                        return "img/music.png";
                    }
                    else {
                        return media.icon;
                    }
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Object)
            ], M1mMediaRenderer.prototype, "nf", void 0);
            M1mMediaRenderer = __decorate([
                core_1.Component({
                    selector: "m1m-media-renderer",
                    templateUrl: "ts/Components/m1m-media-renderer.html",
                    styleUrls: ["ts/Components/m1m-media-renderer.css"]
                }), 
                __metadata('design:paramtypes', [CommService_1.CommService])
            ], M1mMediaRenderer);
            exports_1("M1mMediaRenderer", M1mMediaRenderer);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvbTFtLW1lZGlhLXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBdUNBLFdBQUssVUFBVTtnQkFBRSwyQ0FBSSxDQUFBO2dCQUFFLDZDQUFLLENBQUE7Z0JBQUUsMkNBQUksQ0FBQTtZQUFBLENBQUMsRUFBOUIsVUFBVSxLQUFWLFVBQVUsUUFBb0I7WUFNbkM7Z0JBWUksWUFBb0IsRUFBZTtvQkFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO29CQU5uQyxhQUFRLEdBQWtCLEVBQUUsQ0FBQztvQkFFN0IsU0FBSSxHQUFzQixLQUFLLENBQUM7b0JBQ2hDLFdBQU0sR0FBb0IsQ0FBQyxDQUFDO29CQUU1QixjQUFTLEdBQWlCLFVBQVUsQ0FBQyxJQUFJLENBQUM7b0JBRXRDLG9DQUFvQztnQkFDeEMsQ0FBQztnQkFDRCxRQUFRO29CQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQztvQkFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUUsQ0FBQyxLQUFrRDt3QkFDeEUsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBRSw2QkFBNkIsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO3dCQUNsRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzt3QkFDekQsSUFBSSxDQUFDLHNCQUFzQixDQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsaURBQWlELENBQUMsQ0FBQyxDQUFDO3dCQUM3RixJQUFJLENBQUMsaUJBQWlCLENBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsQ0FB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QkFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUU7NEJBQ2QsNEJBQTRCO3dCQUNoQyxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELE9BQU8sQ0FBQyxLQUFZO29CQUNoQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzt3QkFDcEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7b0JBQzdCLENBQUM7b0JBQ0QsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyx1QkFBdUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN6RCxNQUFNLENBQUMsY0FBYyxDQUFDO29CQUMxQixDQUFDO29CQUFBLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLGtDQUFrQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQzFFLE1BQU0sQ0FBQyxlQUFlLENBQUM7b0JBQzNCLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLENBQUM7Z0JBQ0wsQ0FBQztZQUNMLENBQUM7WUFsR0c7Z0JBQUMsWUFBSyxFQUFFOzt3REFBQTtZQU5aO2dCQUFDLGdCQUFTLENBQUM7b0JBQ1AsUUFBUSxFQUFJLG9CQUFvQjtvQkFDaEMsV0FBVyxFQUFJLHVDQUF1QztvQkFDdEQsU0FBUyxFQUFTLENBQUUsc0NBQXNDLENBQUU7aUJBQy9ELENBQUM7O2dDQUFBO1lBQ0YsK0NBbUdDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9tMW0tbWVkaWEtcmVuZGVyZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgXHR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQge0NvbW1TZXJ2aWNlLCBNZWRpYVJlbmRlcmVyLCBNZWRpYX0gZnJvbSBcIi4uL1NlcnZpY2VzL0NvbW1TZXJ2aWNlXCI7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzXCI7XG5cbnR5cGUgUmVuZGVyaW5nQ29udHJvbFR5cGUgPSB7XG4gICAgTXV0ZSAgICAgICAgICAgIDogc3RyaW5nOyAvLyBcIjBcIiBvdSBcIjFcIlxuICAgIFByZXNldE5hbWVMaXN0ICA6IHN0cmluZzsgLy8gZXg6IFwiRmFjdG9yeURlZmF1bHRzXCJcbiAgICBWb2x1bWUgICAgICAgICAgOiBzdHJpbmc7IC8vIFwiMFwiIMOgIFwiMTAwXCJcbiAgICBWb2x1bWVEQiAgICAgICAgOiBzdHJpbmc7IC8vIGTDqWR1Y3Rpb24gZGVzIGTDqWNpYmVscywgb3Bwb3PDqSBkZSBWb2x1bWVcbn07XG50eXBlIEFWVHJhbnNwb3J0VHlwZSA9IHtcbiAgICBBVlRyYW5zcG9ydFVSSSAgICAgICAgICAgICAgOiBzdHJpbmc7IC8vIFVSSSBkdSBtw6lkaWFcbiAgICBBVlRyYW5zcG9ydFVSSU1ldGFEYXRhICAgICAgOiBzdHJpbmc7IC8vIFJlcHLDqXNlbnRlIGxlIERJREwtTGl0ZSBkdSBtw6lkaWFcbiAgICBDdXJyZW50TWVkaWFEdXJhdGlvbiAgICAgICAgOiBzdHJpbmc7IC8vIEZvcm1hdCB0eXBlIFwiMDE6MzY6NTBcIlxuICAgIEN1cnJlbnRQbGF5TW9kZSAgICAgICAgICAgICA6IHN0cmluZzsgLy8gZXg6IFwiTk9STUFMXCJcbiAgICBDdXJyZW50UmVjb3JkUXVhbGl0eU1vZGUgICAgOiBzdHJpbmc7IC8vIGV4OiBcIk5PVF9JTVBMRU1FTlRFRFwiXG4gICAgQ3VycmVudFRyYWNrICAgICAgICAgICAgICAgIDogc3RyaW5nOyAvLyBleDogXCIxXCJcbiAgICBDdXJyZW50VHJhY2tEdXJhdGlvbiAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIjAxOjM2OjUwXCJcbiAgICBDdXJyZW50VHJhY2tNZXRhRGF0YSAgICAgICAgOiBzdHJpbmc7IC8vIFJlcHLDqXNlbnRlIGxlIERJREwtTGl0ZSBkZSBsYSBwaXN0ZVxuICAgIEN1cnJlbnRUcmFja1VSSSAgICAgICAgICAgICA6IHN0cmluZzsgLy8gVVJJIGRlIGxhIHBpc3RlXG4gICAgQ3VycmVudFRyYW5zcG9ydEFjdGlvbnMgICAgIDogc3RyaW5nOyAvLyBBY3Rpb25zIHBvc3NpYmxlLCBleDogXCJQbGF5LFBhdXNlLFN0b3AsU2VlayxOZXh0LFByZXZpb3VzXCJcbiAgICBOZXh0QVZUcmFuc3BvcnRVUkkgICAgICAgICAgOiBzdHJpbmc7IC8vIFByb2NoYWluZSBVUklcbiAgICBOZXh0QVZUcmFuc3BvcnRVUklNZXRhRGF0YSAgOiBzdHJpbmc7IC8vIFByb2NoYWluIERJRExcbiAgICBOdW1iZXJPZlRyYWNrcyAgICAgICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIjFcIlxuICAgIFBsYXliYWNrU3RvcmFnZU1lZGl1bSAgICAgICA6IHN0cmluZzsgLy8gZXg6IFwiTk9ORVwiXG4gICAgUG9zc2libGVQbGF5YmFja1N0b3JhZ2VNZWRpYTogc3RyaW5nOyAvLyBleCBcIk5PTkUsTkVUV09SSyxIREQsQ0QtREEsVU5LTk9XTlwiXG4gICAgUG9zc2libGVSZWNvcmRRdWFsaXR5TW9kZXMgIDogc3RyaW5nOyAvLyBleDogXCJOT1RfSU1QTEVNRU5URURcIlxuICAgIFBvc3NpYmxlUmVjb3JkU3RvcmFnZU1lZGlhICA6IHN0cmluZzsgLy8gZXggXCJOT1RfSU1QTEVNRU5URURcIlxuICAgIFJlY29yZE1lZGl1bVdyaXRlU3RhdHVzICAgICA6IHN0cmluZzsgLy8gZXg6IFwiTk9UX0lNUExFTUVOVEVEXCJcbiAgICBSZWNvcmRTdG9yYWdlTWVkaXVtICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIk5PVF9JTVBMRU1FTlRFRFwiXG4gICAgVHJhbnNwb3J0UGxheVNwZWVkICAgICAgICAgIDogc3RyaW5nOyAvLyBleDogXCIxXCJcbiAgICBUcmFuc3BvcnRTdGF0ZSAgICAgICAgICAgICAgOiBzdHJpbmc7IC8vIGV4OiBcIlBBVVNFRF9QTEFZQkFDS1wiXG4gICAgVHJhbnNwb3J0U3RhdHVzICAgICAgICAgICAgIDogc3RyaW5nOyAvLyBleDogXCJPS1wiXG59O1xudHlwZSBldmVudE1lZGlhUGxheWVyID0ge1xuICAgIHNlcnZpY2VUeXBlIDogc3RyaW5nO1xuICAgIGF0dHJpYnV0ICAgIDogc3RyaW5nO1xuICAgIHZhbHVlICAgICAgIDogbnVtYmVyIHwgc3RyaW5nO1xufTtcbmVudW0gUExBWV9TVEFURSB7UExBWSwgUEFVU0UsIFNUT1B9XG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0XHQ6IFwibTFtLW1lZGlhLXJlbmRlcmVyXCIsXG4gICAgdGVtcGxhdGVVcmxcdFx0OiBcInRzL0NvbXBvbmVudHMvbTFtLW1lZGlhLXJlbmRlcmVyLmh0bWxcIixcbiAgICBzdHlsZVVybHMgICAgICAgOiBbIFwidHMvQ29tcG9uZW50cy9tMW0tbWVkaWEtcmVuZGVyZXIuY3NzXCIgXVxufSlcbmV4cG9ydCBjbGFzcyBNMW1NZWRpYVJlbmRlcmVyIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBuZlx0OiBNZWRpYVJlbmRlcmVyO1xuICAgIG9ic0V2ZW50ICAgIDogT2JzZXJ2YWJsZTxhbnk+O1xuICAgIHN0YXRlICAgICAgIDogeyBcInVybjpzY2hlbWFzLXVwbnAtb3JnOnNlcnZpY2U6QVZUcmFuc3BvcnQ6MVwiICAgICAgICA6IEFWVHJhbnNwb3J0VHlwZTtcbiAgICAgICAgICAgICAgICAgICAgXCJ1cm46c2NoZW1hcy11cG5wLW9yZzpzZXJ2aWNlOlJlbmRlcmluZ0NvbnRyb2w6MVwiICAgOiBSZW5kZXJpbmdDb250cm9sVHlwZTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgZHVyYXRpb24gICAgOiBzdHJpbmcgICAgPSBcIlwiO1xuICAgIGN1cnJlbnRNZWRpYTogTWVkaWE7XG4gICAgbXV0ZSAgICAgICAgOiBib29sZWFuICAgPSBmYWxzZTtcbiAgICB2b2x1bWUgICAgICA6IG51bWJlciAgICA9IDA7XG4gICAgdGltZW91dFZvbCAgOiBudW1iZXI7XG4gICAgcGxheVN0YXRlICAgOiBQTEFZX1NUQVRFPSBQTEFZX1NUQVRFLlNUT1A7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjczogQ29tbVNlcnZpY2UpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coIFwiQ29tbVNlcnZpY2U6XCIsIGNzKTtcbiAgICB9XG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub2JzRXZlbnQgPSB0aGlzLmNzLnN1YnNjcmliZSggdGhpcy5uZi5pZCApO1xuICAgICAgICB0aGlzLm9ic0V2ZW50LnN1YnNjcmliZSggKGV2ZW50OiB7ZXZlbnROYW1lOiBzdHJpbmcsIGRhdGE6IGV2ZW50TWVkaWFQbGF5ZXJ9KSA9PiB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyggXCJNMW1NZWRpYVJlbmRlcmVyIFVQblAgZXZlbnRcIiwgZXZlbnQuZGF0YS5hdHRyaWJ1dCApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZVtkYXRhLnNlcnZpY2VUeXBlXVtkYXRhLmF0dHJpYnV0XSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJlbmRlcmluZ0NvbnRyb2wgKCB0aGlzLnN0YXRlW1widXJuOnNjaGVtYXMtdXBucC1vcmc6c2VydmljZTpSZW5kZXJpbmdDb250cm9sOjFcIl0pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBVlRyYW5zcG9ydCAgICAgICggdGhpcy5zdGF0ZVtcInVybjpzY2hlbWFzLXVwbnAtb3JnOnNlcnZpY2U6QVZUcmFuc3BvcnQ6MVwiXSAgICAgKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBpZiAoZGF0YS5zZXJ2aWNlVHlwZSA9PT0gXCJVUG5QX01lZGlhXCIgJiYgZGF0YS5hdHRyaWJ1dCA9PT0gXCJpdGVtTWV0YWRhdGFcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1lZGlhID0gdGhpcy5jcy5nZXRNZWRpYUZyb21ESURMKCBkYXRhLnZhbHVlIGFzIHN0cmluZyApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jcy5jYWxsKHRoaXMubmYuaWQsIFwiZ2V0TWVkaWFzU3RhdGVzXCIsIFtdKS50aGVuKCAoc3RhdGUpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCBcImdldE1lZGlhc1N0YXRlcyA9PlwiLCBzdGF0ZSApO1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgbGV0IEFWVHJhbnNwb3J0ICAgICAgPSB0aGlzLnN0YXRlW1widXJuOnNjaGVtYXMtdXBucC1vcmc6c2VydmljZTpBVlRyYW5zcG9ydDoxXCJdLFxuICAgICAgICAgICAgICAgIFJlbmRlcmluZ0NvbnRyb2wgPSB0aGlzLnN0YXRlW1widXJuOnNjaGVtYXMtdXBucC1vcmc6c2VydmljZTpSZW5kZXJpbmdDb250cm9sOjFcIl0sXG4gICAgICAgICAgICAgICAgVVBuUF9NZWRpYSAgICAgICA9IHRoaXMuc3RhdGVbXCJVUG5QX01lZGlhXCJdO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSZW5kZXJpbmdDb250cm9sICggUmVuZGVyaW5nQ29udHJvbCApO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBVlRyYW5zcG9ydCAgICAgICggQVZUcmFuc3BvcnQgICAgICApO1xuICAgICAgICAgICAgaWYgKCBVUG5QX01lZGlhICYmIFVQblBfTWVkaWEuaXRlbU1ldGFkYXRhICkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudE1lZGlhID0gdGhpcy5jcy5nZXRNZWRpYUZyb21ESURMKCBVUG5QX01lZGlhLml0ZW1NZXRhZGF0YSApO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMuY3VycmVudE1lZGlhLmR1cmF0aW9uID0gQVZUcmFuc3BvcnQuQ3VycmVudE1lZGlhRHVyYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB1cGRhdGVSZW5kZXJpbmdDb250cm9sKHJlbmRlcmluZ0NvbnRyb2w6IFJlbmRlcmluZ0NvbnRyb2xUeXBlKSB7XG4gICAgICAgIGlmKCFyZW5kZXJpbmdDb250cm9sKSByZXR1cm47XG4gICAgICAgIHRoaXMubXV0ZSAgID0gcmVuZGVyaW5nQ29udHJvbC5NdXRlID09PSBcIjFcIiB8fCByZW5kZXJpbmdDb250cm9sLk11dGUgPT09IFwidHJ1ZVwiO1xuICAgICAgICB0aGlzLnZvbHVtZSA9K3JlbmRlcmluZ0NvbnRyb2wuVm9sdW1lO1xuICAgIH1cbiAgICB1cGRhdGVBVlRyYW5zcG9ydChBVlRyYW5zcG9ydDogQVZUcmFuc3BvcnRUeXBlKSB7XG4gICAgICAgIGlmKCFBVlRyYW5zcG9ydCkgcmV0dXJuO1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gQVZUcmFuc3BvcnQuQ3VycmVudE1lZGlhRHVyYXRpb247XG4gICAgICAgIHN3aXRjaChBVlRyYW5zcG9ydC5UcmFuc3BvcnRTdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSBcIlNUT1BQRURcIiAgICAgICAgICA6IHRoaXMucGxheVN0YXRlID0gUExBWV9TVEFURS5TVE9QIDsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiUExBWUlOR1wiICAgICAgICAgIDogdGhpcy5wbGF5U3RhdGUgPSBQTEFZX1NUQVRFLlBMQVkgOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJQQVVTRURfUExBWUJBQ0tcIiAgOiB0aGlzLnBsYXlTdGF0ZSA9IFBMQVlfU1RBVEUuUEFVU0U7IGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFZvbHVtZSh2b2x1bWU6IG51bWJlcikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyggXCJzZXRWb2x1bWVcIiwgdm9sdW1lICk7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRWb2wpO1xuICAgICAgICB0aGlzLnRpbWVvdXRWb2wgPSB3aW5kb3cuc2V0VGltZW91dCAoICgpID0+IHRoaXMuY3Muc2V0Vm9sdW1lKHRoaXMubmYuaWQsIHZvbHVtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCA1MCApO1xuICAgIH1cbiAgICBpc1BsYXlpbmcoKSA6IGJvb2xlYW4ge3JldHVybiB0aGlzLnBsYXlTdGF0ZSA9PT0gUExBWV9TVEFURS5QTEFZIDt9XG4gICAgaXNQYXVzZWQgKCkgOiBib29sZWFuIHtyZXR1cm4gdGhpcy5wbGF5U3RhdGUgPT09IFBMQVlfU1RBVEUuUEFVU0U7fVxuICAgIGlzU3RvcHBlZCgpIDogYm9vbGVhbiB7cmV0dXJuIHRoaXMucGxheVN0YXRlID09PSBQTEFZX1NUQVRFLlNUT1AgO31cbiAgICBwbGF5KCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5wbGF5KCB0aGlzLm5mLmlkICk7XG4gICAgfVxuICAgIHBhdXNlKCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5wYXVzZSggdGhpcy5uZi5pZCApO1xuICAgIH1cbiAgICBzdG9wKCkgOiBQcm9taXNlPGFueT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcy5zdG9wKCB0aGlzLm5mLmlkICk7XG4gICAgfVxuICAgIGlzTWVkaWEob2JqOiBhbnkpIDogYm9vbGVhbiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXNNZWRpYVwiLCBvYmopO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgbG9hZE1lZGlhKG1lZGlhOiBNZWRpYSkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5mLmlkLCBcImxvYWRNZWRpYVwiLCBtZWRpYS5zZXJ2ZXJJZCwgbWVkaWEubWVkaWFJZCk7XG4gICAgICAgIHRoaXMuY3MubG9hZE1lZGlhKCB0aGlzLm5mLmlkLCBtZWRpYS5zZXJ2ZXJJZCwgbWVkaWEubWVkaWFJZCApLnRoZW4oIChyZXApID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVwOlwiLCByZXApO1xuICAgICAgICAgICAgdGhpcy5wbGF5KCkudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIFN1YnNjcmliZSB0byBtZWRpYSBzZXJ2ZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0SWNvbihtZWRpYTogTWVkaWEpOiBzdHJpbmcge1xuICAgICAgICBpZiAobWVkaWEuYWxidW1hcnR1cmkpIHtcbiAgICAgICAgICAgIHJldHVybiBtZWRpYS5hbGJ1bWFydHVyaTtcbiAgICAgICAgfVxuICAgICAgICBpZihtZWRpYS5jbGFzc2UgPT09IFwib2JqZWN0Lml0ZW0udmlkZW9JdGVtXCIgJiYgIW1lZGlhLmljb24pIHtcbiAgICAgICAgICAgIHJldHVybiBcImltZy9maWxtLnBuZ1wiO1xuICAgICAgICB9ZWxzZSBpZihtZWRpYS5jbGFzc2UgPT09IFwib2JqZWN0Lml0ZW0uYXVkaW9JdGVtLm11c2ljVHJhY2tcIiAmJiAhbWVkaWEuaWNvbikge1xuICAgICAgICAgICAgcmV0dXJuIFwiaW1nL211c2ljLnBuZ1wiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG1lZGlhLmljb247XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9
