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
    var M1mMediaBrowser;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            }],
        execute: function() {
            M1mMediaBrowser = class M1mMediaBrowser {
                constructor(cs) {
                    this.cs = cs;
                    this.breadcrumb = [];
                    // console.log( "CommService:", cs);
                }
                showArrow() {
                    return false;
                }
                browseMediaServer(ms) {
                    this.breadcrumb = [];
                    this.ms = ms;
                    this.data = null;
                    this.showArrow();
                    if (ms) {
                        this.browse();
                    }
                }
                browse(directory) {
                    let directoryId;
                    if (directory) {
                        directoryId = directory.directoryId;
                        let keep = true;
                        this.breadcrumb = this.breadcrumb.filter(D => keep && (keep = D !== directory));
                        this.breadcrumb.push(directory);
                    }
                    else {
                        directoryId = "0";
                    }
                    this.data = null;
                    return this.cs.browse(this.ms.id, directoryId).then((data) => {
                        console.log("Browse", this.ms.id, directoryId, "=>", data);
                        this.data = data;
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
                getCurrentDir() {
                    return this.breadcrumb.length !== 0 ? this.breadcrumb[this.breadcrumb.length - 1] : null;
                }
                getParentDir() {
                    // return this.breadcrumb[ this.breadcrumb.length - 2 ] || this.breadcrumb[0];
                    return this.breadcrumb.length !== 0 ? this.breadcrumb[this.breadcrumb.length - 2] : null;
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', Array)
            ], M1mMediaBrowser.prototype, "devices", void 0);
            M1mMediaBrowser = __decorate([
                core_1.Component({
                    selector: "m1m-media-browser",
                    templateUrl: "ts/Components/m1m-media-browser.html",
                    styleUrls: ["ts/Components/m1m-media-browser.css"
                    ]
                }), 
                __metadata('design:paramtypes', [CommService_1.CommService])
            ], M1mMediaBrowser);
            exports_1("M1mMediaBrowser", M1mMediaBrowser);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvbTFtLW1lZGlhLWJyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFTQTtnQkFLSSxZQUFvQixFQUFlO29CQUFmLE9BQUUsR0FBRixFQUFFLENBQWE7b0JBSDNCLGVBQVUsR0FBb0IsRUFBRSxDQUFDO29CQUlyQyxvQ0FBb0M7Z0JBQ3hDLENBQUM7Z0JBQ0QsU0FBUztvQkFDTCxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNqQixDQUFDO2dCQUNELGlCQUFpQixDQUFDLEVBQWU7b0JBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO29CQUNyQixJQUFJLENBQUMsRUFBRSxHQUFXLEVBQUUsQ0FBQztvQkFDckIsSUFBSSxDQUFDLElBQUksR0FBUyxJQUFJLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDakIsRUFBRSxDQUFBLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDSixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQ2xCLENBQUM7Z0JBQ0wsQ0FBQztnQkFDRCxNQUFNLENBQUUsU0FBcUI7b0JBQ3pCLElBQUksV0FBbUIsQ0FBQztvQkFDeEIsRUFBRSxDQUFBLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxXQUFXLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQzt3QkFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO3dCQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFFLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFFLENBQUM7d0JBQ2hGLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNwQyxDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLFdBQVcsR0FBRyxHQUFHLENBQUM7b0JBQ3RCLENBQUM7b0JBQ0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7b0JBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxJQUFJO3dCQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBRSxDQUFDO3dCQUM3RCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDckIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFDRCxPQUFPLENBQUMsS0FBWTtvQkFDaEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO29CQUM3QixDQUFDO29CQUNELEVBQUUsQ0FBQSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssdUJBQXVCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDekQsTUFBTSxDQUFDLGNBQWMsQ0FBQztvQkFDMUIsQ0FBQztvQkFBQSxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxrQ0FBa0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUMxRSxNQUFNLENBQUMsZUFBZSxDQUFDO29CQUMzQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUN0QixDQUFDO2dCQUNMLENBQUM7Z0JBQ0QsYUFBYTtvQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUcsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLEdBQUMsSUFBSSxDQUFDO2dCQUN6RixDQUFDO2dCQUNELFlBQVk7b0JBQ1IsOEVBQThFO29CQUM5RSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUcsQ0FBQyxHQUFDLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLEdBQUMsSUFBSSxDQUFFO2dCQUMxRixDQUFDO1lBQ0wsQ0FBQztZQXRERztnQkFBQyxZQUFLLEVBQUU7OzREQUFBO1lBUFo7Z0JBQUMsZ0JBQVMsQ0FBQztvQkFDUCxRQUFRLEVBQUksbUJBQW1CO29CQUMvQixXQUFXLEVBQUksc0NBQXNDO29CQUNyRCxTQUFTLEVBQVMsQ0FBRSxxQ0FBcUM7cUJBQ3RDO2lCQUN0QixDQUFDOzsrQkFBQTtZQUNGLDZDQXVEQyxDQUFBIiwiZmlsZSI6IkNvbXBvbmVudHMvbTFtLW1lZGlhLWJyb3dzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IFx0fSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtDb21tU2VydmljZSwgRGlyZWN0b3J5LCBNZWRpYVNlcnZlciwgRGF0YUJyb3dzZSwgTWVkaWF9IGZyb20gXCIuLi9TZXJ2aWNlcy9Db21tU2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0XHQ6IFwibTFtLW1lZGlhLWJyb3dzZXJcIixcbiAgICB0ZW1wbGF0ZVVybFx0XHQ6IFwidHMvQ29tcG9uZW50cy9tMW0tbWVkaWEtYnJvd3Nlci5odG1sXCIsXG4gICAgc3R5bGVVcmxzICAgICAgIDogWyBcInRzL0NvbXBvbmVudHMvbTFtLW1lZGlhLWJyb3dzZXIuY3NzXCJcbiAgICAgICAgICAgICAgICAgICAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE0xbU1lZGlhQnJvd3NlciB7XG4gICAgQElucHV0KCkgZGV2aWNlc1x0OiBNZWRpYVNlcnZlcltdO1xuICAgIHByaXZhdGUgYnJlYWRjcnVtYiAgOiBEaXJlY3RvcnkgIFtdID0gW107XG4gICAgcHJpdmF0ZSBkYXRhICAgICAgICA6IERhdGFCcm93c2U7XG4gICAgcHJpdmF0ZSBtcyAgICAgICAgICA6IE1lZGlhU2VydmVyO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY3M6IENvbW1TZXJ2aWNlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCBcIkNvbW1TZXJ2aWNlOlwiLCBjcyk7XG4gICAgfVxuICAgIHNob3dBcnJvdygpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBicm93c2VNZWRpYVNlcnZlcihtczogTWVkaWFTZXJ2ZXIpIHtcbiAgICAgICAgdGhpcy5icmVhZGNydW1iID0gW107XG4gICAgICAgIHRoaXMubXMgICAgICAgICA9IG1zO1xuICAgICAgICB0aGlzLmRhdGEgICAgICAgPSBudWxsO1xuICAgICAgICB0aGlzLnNob3dBcnJvdygpO1xuICAgICAgICBpZihtcykge1xuICAgICAgICAgICAgdGhpcy5icm93c2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBicm93c2UoIGRpcmVjdG9yeT86IERpcmVjdG9yeSApIHtcbiAgICAgICAgbGV0IGRpcmVjdG9yeUlkOiBzdHJpbmc7XG4gICAgICAgIGlmKGRpcmVjdG9yeSkge1xuICAgICAgICAgICAgZGlyZWN0b3J5SWQgPSBkaXJlY3RvcnkuZGlyZWN0b3J5SWQ7XG4gICAgICAgICAgICBsZXQga2VlcCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJyZWFkY3J1bWIgPSB0aGlzLmJyZWFkY3J1bWIuZmlsdGVyKCBEID0+IGtlZXAgJiYgKGtlZXA9RCAhPT0gZGlyZWN0b3J5KSApO1xuICAgICAgICAgICAgdGhpcy5icmVhZGNydW1iLnB1c2goZGlyZWN0b3J5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRpcmVjdG9yeUlkID0gXCIwXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3MuYnJvd3NlKCB0aGlzLm1zLmlkLCBkaXJlY3RvcnlJZCApLnRoZW4oIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyggXCJCcm93c2VcIiwgdGhpcy5tcy5pZCwgZGlyZWN0b3J5SWQsIFwiPT5cIiwgZGF0YSApO1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldEljb24obWVkaWE6IE1lZGlhKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKG1lZGlhLmFsYnVtYXJ0dXJpKSB7XG4gICAgICAgICAgICByZXR1cm4gbWVkaWEuYWxidW1hcnR1cmk7XG4gICAgICAgIH1cbiAgICAgICAgaWYobWVkaWEuY2xhc3NlID09PSBcIm9iamVjdC5pdGVtLnZpZGVvSXRlbVwiICYmICFtZWRpYS5pY29uKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJpbWcvZmlsbS5wbmdcIjtcbiAgICAgICAgfWVsc2UgaWYobWVkaWEuY2xhc3NlID09PSBcIm9iamVjdC5pdGVtLmF1ZGlvSXRlbS5tdXNpY1RyYWNrXCIgJiYgIW1lZGlhLmljb24pIHtcbiAgICAgICAgICAgIHJldHVybiBcImltZy9tdXNpYy5wbmdcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBtZWRpYS5pY29uO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldEN1cnJlbnREaXIoKTogRGlyZWN0b3J5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYnJlYWRjcnVtYi5sZW5ndGghPT0wP3RoaXMuYnJlYWRjcnVtYlsgdGhpcy5icmVhZGNydW1iLmxlbmd0aCAtIDEgXTpudWxsO1xuICAgIH1cbiAgICBnZXRQYXJlbnREaXIoKTogRGlyZWN0b3J5IHtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuYnJlYWRjcnVtYlsgdGhpcy5icmVhZGNydW1iLmxlbmd0aCAtIDIgXSB8fCB0aGlzLmJyZWFkY3J1bWJbMF07XG4gICAgICAgIHJldHVybiB0aGlzLmJyZWFkY3J1bWIubGVuZ3RoIT09MD90aGlzLmJyZWFkY3J1bWJbIHRoaXMuYnJlYWRjcnVtYi5sZW5ndGggLSAyIF06bnVsbCA7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
