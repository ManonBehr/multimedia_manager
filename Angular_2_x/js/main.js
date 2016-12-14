System.register(["@angular/platform-browser-dynamic", "@angular/core", "@angular/platform-browser", "./m1m-multimedia-module", "alx-dragdrop/DragDropModule"], function(exports_1, context_1) {
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
    var platform_browser_dynamic_1, core_1, platform_browser_1, core_2, m1m_multimedia_module_1, DragDropModule_1;
    var RootManager, AppModule;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (m1m_multimedia_module_1_1) {
                m1m_multimedia_module_1 = m1m_multimedia_module_1_1;
            },
            function (DragDropModule_1_1) {
                DragDropModule_1 = DragDropModule_1_1;
            }],
        execute: function() {
            // import { PolymerElement } from "@vaadin/angular2-polymer";
            // import "@vaadin/angular2-polymer";
            RootManager = class RootManager {
            };
            RootManager = __decorate([
                core_1.Component({
                    selector: "root-manager",
                    template: `<comp-multimedia-manager title="Gestion des services UPnP/DLNA" 
											alx-dragdrop></comp-multimedia-manager>
				  `
                }), 
                __metadata('design:paramtypes', [])
            ], RootManager);
            //enableProdMode();
            AppModule = class AppModule {
            };
            AppModule = __decorate([
                core_2.NgModule({
                    imports: [m1m_multimedia_module_1.M1mMultimediaModule, platform_browser_1.BrowserModule, DragDropModule_1.DragDropModule],
                    declarations: [RootManager,],
                    bootstrap: [RootManager],
                    schemas: [core_2.CUSTOM_ELEMENTS_SCHEMA]
                }), 
                __metadata('design:paramtypes', [])
            ], AppModule);
            exports_1("AppModule", AppModule);
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
        }
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBUUEsNkRBQTZEO1lBQzdELHFDQUFxQztZQVFyQztZQUNBLENBQUM7WUFQRDtnQkFBQyxnQkFBUyxDQUFDO29CQUNWLFFBQVEsRUFBRyxjQUFjO29CQUN6QixRQUFRLEVBQUc7O09BRUw7aUJBQ04sQ0FBQzs7MkJBQUE7WUFJRixtQkFBbUI7WUFPbkI7WUFBd0IsQ0FBQztZQU56QjtnQkFBQyxlQUFRLENBQUM7b0JBQ1QsT0FBTyxFQUFPLENBQUUsMkNBQW1CLEVBQUUsZ0NBQWEsRUFBRSwrQkFBYyxDQUFFO29CQUNwRSxZQUFZLEVBQUUsQ0FBRSxXQUFXLEVBQUk7b0JBQy9CLFNBQVMsRUFBSyxDQUFFLFdBQVcsQ0FBRTtvQkFDMUIsT0FBTyxFQUFPLENBQUUsNkJBQXNCLENBQUc7aUJBQzVDLENBQUM7O3lCQUFBO1lBQ0YsaUNBQXlCLENBQUE7WUFFekIsaURBQXNCLEVBQUUsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHBsYXRmb3JtQnJvd3NlckR5bmFtaWMgfSAgIGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWNcIjtcbmltcG9ydCB7Q29tcG9uZW50fSAgICAgICAgICAgICAgICAgIGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gICAgXHRcdGZyb20gXCJAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyXCI7XG5pbXBvcnQgeyBOZ01vZHVsZSwgQ1VTVE9NX0VMRU1FTlRTX1NDSEVNQSAgfSBcdFx0XHRcdGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IE0xbU11bHRpbWVkaWFNb2R1bGUgfSBcdFx0ZnJvbSBcIi4vbTFtLW11bHRpbWVkaWEtbW9kdWxlXCI7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IFx0XHRcdGZyb20gXCJhbHgtZHJhZ2Ryb3AvRHJhZ0Ryb3BNb2R1bGVcIjtcblxuLy8gaW1wb3J0IHsgUG9seW1lckVsZW1lbnQgfSBmcm9tIFwiQHZhYWRpbi9hbmd1bGFyMi1wb2x5bWVyXCI7XG4vLyBpbXBvcnQgXCJAdmFhZGluL2FuZ3VsYXIyLXBvbHltZXJcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yXHQ6IFwicm9vdC1tYW5hZ2VyXCIsXG5cdHRlbXBsYXRlXHQ6IGA8Y29tcC1tdWx0aW1lZGlhLW1hbmFnZXIgdGl0bGU9XCJHZXN0aW9uIGRlcyBzZXJ2aWNlcyBVUG5QL0RMTkFcIiBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRhbHgtZHJhZ2Ryb3A+PC9jb21wLW11bHRpbWVkaWEtbWFuYWdlcj5cblx0XHRcdFx0ICBgXG59KVxuY2xhc3MgUm9vdE1hbmFnZXIge1xufVxuXG4vL2VuYWJsZVByb2RNb2RlKCk7XG5ATmdNb2R1bGUoe1xuXHRpbXBvcnRzICAgICA6IFsgTTFtTXVsdGltZWRpYU1vZHVsZSwgQnJvd3Nlck1vZHVsZSwgRHJhZ0Ryb3BNb2R1bGUgXSxcblx0ZGVjbGFyYXRpb25zOiBbIFJvb3RNYW5hZ2VyLCAgXSxcblx0Ym9vdHN0cmFwICAgOiBbIFJvb3RNYW5hZ2VyIF0sXG4gICAgc2NoZW1hcyAgICAgOiBbIENVU1RPTV9FTEVNRU5UU19TQ0hFTUEgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHt9XG5cbnBsYXRmb3JtQnJvd3NlckR5bmFtaWMoKS5ib290c3RyYXBNb2R1bGUoQXBwTW9kdWxlKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
