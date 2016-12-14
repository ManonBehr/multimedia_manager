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
    var CompMultimediaManager;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (CommService_1_1) {
                CommService_1 = CommService_1_1;
            }],
        execute: function() {
            CompMultimediaManager = class CompMultimediaManager {
                constructor(comm) {
                    this.comm = comm;
                    this.mediaRenderers = [];
                    this.mediaServers = [];
                    //console.log( "CommService:", comm);
                    comm.init(localStorage.getItem("TActHab_adresse")).subscribe((data) => {
                        //console.log( "init =>", data );
                        this.mediaRenderers = data.mediaRenderers;
                        this.mediaServers = data.mediaServers;
                    });
                }
            };
            __decorate([
                core_1.Input(), 
                __metadata('design:type', String)
            ], CompMultimediaManager.prototype, "title", void 0);
            CompMultimediaManager = __decorate([
                core_1.Component({
                    selector: "comp-multimedia-manager",
                    templateUrl: "ts/Components/m1m-multimedia-manager.html",
                    styleUrls: ["ts/Components/m1m-multimedia-manager.css"]
                }), 
                __metadata('design:paramtypes', [CommService_1.CommService])
            ], CompMultimediaManager);
            exports_1("CompMultimediaManager", CompMultimediaManager);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbXBvbmVudHMvbTFtLW11bHRpbWVkaWEtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQVFBO2dCQUlJLFlBQW9CLElBQWlCO29CQUFqQixTQUFJLEdBQUosSUFBSSxDQUFhO29CQUZyQyxtQkFBYyxHQUFzQixFQUFFLENBQUM7b0JBQ3ZDLGlCQUFZLEdBQXdCLEVBQUUsQ0FBQztvQkFFbkMscUNBQXFDO29CQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFFLFlBQVksQ0FBQyxPQUFPLENBQUUsaUJBQWlCLENBQUUsQ0FBRSxDQUFDLFNBQVMsQ0FBRSxDQUFDLElBQXFCO3dCQUNwRixpQ0FBaUM7d0JBQ2pDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLFlBQVksR0FBSyxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUM1QyxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQztZQVhHO2dCQUFDLFlBQUssRUFBRTs7Z0VBQUE7WUFOWjtnQkFBQyxnQkFBUyxDQUFDO29CQUNQLFFBQVEsRUFBSSx5QkFBeUI7b0JBQ3JDLFdBQVcsRUFBSSwyQ0FBMkM7b0JBQzFELFNBQVMsRUFBUyxDQUFFLDBDQUEwQyxDQUFFO2lCQUNuRSxDQUFDOztxQ0FBQTtZQUNGLHlEQVlDLENBQUEiLCJmaWxlIjoiQ29tcG9uZW50cy9tMW0tbXVsdGltZWRpYS1tYW5hZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCBcdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Q29tbVNlcnZpY2UsIERhdGFEbG5hRGV2aWNlcywgTWVkaWFTZXJ2ZXIsIE1lZGlhUmVuZGVyZXJ9IGZyb20gXCIuLi9TZXJ2aWNlcy9Db21tU2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3Rvclx0XHQ6IFwiY29tcC1tdWx0aW1lZGlhLW1hbmFnZXJcIixcbiAgICB0ZW1wbGF0ZVVybFx0XHQ6IFwidHMvQ29tcG9uZW50cy9tMW0tbXVsdGltZWRpYS1tYW5hZ2VyLmh0bWxcIixcbiAgICBzdHlsZVVybHMgICAgICAgOiBbIFwidHMvQ29tcG9uZW50cy9tMW0tbXVsdGltZWRpYS1tYW5hZ2VyLmNzc1wiIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29tcE11bHRpbWVkaWFNYW5hZ2VyIHtcbiAgICBASW5wdXQoKSB0aXRsZVx0OiBzdHJpbmc7XG4gICAgbWVkaWFSZW5kZXJlcnMgIDogTWVkaWFSZW5kZXJlcltdID0gW107XG4gICAgbWVkaWFTZXJ2ZXJzICAgIDogTWVkaWFTZXJ2ZXIgIFtdID0gW107XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb21tOiBDb21tU2VydmljZSkge1xuICAgICAgICAvL2NvbnNvbGUubG9nKCBcIkNvbW1TZXJ2aWNlOlwiLCBjb21tKTtcbiAgICAgICAgY29tbS5pbml0KCBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSggXCJUQWN0SGFiX2FkcmVzc2VcIiApICkuc3Vic2NyaWJlKCAoZGF0YTogRGF0YURsbmFEZXZpY2VzKSA9PiB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCBcImluaXQgPT5cIiwgZGF0YSApO1xuICAgICAgICAgICAgdGhpcy5tZWRpYVJlbmRlcmVycyA9IGRhdGEubWVkaWFSZW5kZXJlcnM7XG4gICAgICAgICAgICB0aGlzLm1lZGlhU2VydmVycyAgID0gZGF0YS5tZWRpYVNlcnZlcnM7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=
