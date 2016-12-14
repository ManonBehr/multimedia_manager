import { Component, Input 	} from "@angular/core";
import {CommService, Directory, MediaServer, DataBrowse, Media} from "../Services/CommService";

@Component({
    selector		: "m1m-media-browser",
    templateUrl		: "ts/Components/m1m-media-browser.html",
    styleUrls       : [ "ts/Components/m1m-media-browser.css"
                      ]
})
export class M1mMediaBrowser {
    @Input() devices	: MediaServer[];
    private breadcrumb  : Directory  [] = [];
    private data        : DataBrowse;
    private ms          : MediaServer;
    constructor(private cs: CommService) {
        // console.log( "CommService:", cs);
    }
    showArrow() {
        return false;
    }
    browseMediaServer(ms: MediaServer) {
        this.breadcrumb = [];
        this.ms         = ms;
        this.data       = null;
        this.showArrow();
        if(ms) {
            this.browse();
        }
    }
    browse( directory?: Directory ) {
        let directoryId: string;
        if(directory) {
            directoryId = directory.directoryId;
            let keep = true;
            this.breadcrumb = this.breadcrumb.filter( D => keep && (keep=D !== directory) );
            this.breadcrumb.push(directory);
        } else {
            directoryId = "0";
        }
        this.data = null;
        return this.cs.browse( this.ms.id, directoryId ).then( (data) => {
            console.log( "Browse", this.ms.id, directoryId, "=>", data );
            this.data = data;
        });
    }
    getIcon(media: Media): string {
        if (media.albumarturi) {
            return media.albumarturi;
        }
        if(media.classe === "object.item.videoItem" && !media.icon) {
            return "img/film.png";
        }else if(media.classe === "object.item.audioItem.musicTrack" && !media.icon) {
            return "img/music.png";
        } else {
            return media.icon;
        }
    }
    getCurrentDir(): Directory {
        return this.breadcrumb.length!==0?this.breadcrumb[ this.breadcrumb.length - 1 ]:null;
    }
    getParentDir(): Directory {
        // return this.breadcrumb[ this.breadcrumb.length - 2 ] || this.breadcrumb[0];
        return this.breadcrumb.length!==0?this.breadcrumb[ this.breadcrumb.length - 2 ]:null ;
    }
}
