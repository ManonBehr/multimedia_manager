import { Component, Input, OnInit 	} from "@angular/core";
import {CommService, MediaRenderer, Media} from "../Services/CommService";
import {Observable} from "rxjs";

type RenderingControlType = {
    Mute            : string; // "0" ou "1"
    PresetNameList  : string; // ex: "FactoryDefaults"
    Volume          : string; // "0" à "100"
    VolumeDB        : string; // déduction des décibels, opposé de Volume
};
type AVTransportType = {
    AVTransportURI              : string; // URI du média
    AVTransportURIMetaData      : string; // Représente le DIDL-Lite du média
    CurrentMediaDuration        : string; // Format type "01:36:50"
    CurrentPlayMode             : string; // ex: "NORMAL"
    CurrentRecordQualityMode    : string; // ex: "NOT_IMPLEMENTED"
    CurrentTrack                : string; // ex: "1"
    CurrentTrackDuration        : string; // ex: "01:36:50"
    CurrentTrackMetaData        : string; // Représente le DIDL-Lite de la piste
    CurrentTrackURI             : string; // URI de la piste
    CurrentTransportActions     : string; // Actions possible, ex: "Play,Pause,Stop,Seek,Next,Previous"
    NextAVTransportURI          : string; // Prochaine URI
    NextAVTransportURIMetaData  : string; // Prochain DIDL
    NumberOfTracks              : string; // ex: "1"
    PlaybackStorageMedium       : string; // ex: "NONE"
    PossiblePlaybackStorageMedia: string; // ex "NONE,NETWORK,HDD,CD-DA,UNKNOWN"
    PossibleRecordQualityModes  : string; // ex: "NOT_IMPLEMENTED"
    PossibleRecordStorageMedia  : string; // ex "NOT_IMPLEMENTED"
    RecordMediumWriteStatus     : string; // ex: "NOT_IMPLEMENTED"
    RecordStorageMedium         : string; // ex: "NOT_IMPLEMENTED"
    TransportPlaySpeed          : string; // ex: "1"
    TransportState              : string; // ex: "PAUSED_PLAYBACK"
    TransportStatus             : string; // ex: "OK"
};
type eventMediaPlayer = {
    serviceType : string;
    attribut    : string;
    value       : number | string;
};
enum PLAY_STATE {PLAY, PAUSE, STOP}
@Component({
    selector		: "m1m-media-renderer",
    templateUrl		: "ts/Components/m1m-media-renderer.html",
    styleUrls       : [ "ts/Components/m1m-media-renderer.css" ]
})
export class M1mMediaRenderer implements OnInit {
    @Input() nf	: MediaRenderer;
    obsEvent    : Observable<any>;
    state       : { "urn:schemas-upnp-org:service:AVTransport:1"        : AVTransportType;
                    "urn:schemas-upnp-org:service:RenderingControl:1"   : RenderingControlType;
                  };
    duration    : string    = "";
    currentMedia: Media;
    mute        : boolean   = false;
    volume      : number    = 0;
    timeoutVol  : number;
    playState   : PLAY_STATE= PLAY_STATE.STOP;
    constructor(private cs: CommService) {
        // console.log( "CommService:", cs);
    }
    ngOnInit(): void {
        this.obsEvent = this.cs.subscribe( this.nf.id );
        this.obsEvent.subscribe( (event: {eventName: string, data: eventMediaPlayer}) => {
            let data = event.data;
            console.log( "M1mMediaRenderer UPnP event", event.data.attribut );
            this.state[data.serviceType][data.attribut] = data.value;
            this.updateRenderingControl ( this.state["urn:schemas-upnp-org:service:RenderingControl:1"]);
            this.updateAVTransport      ( this.state["urn:schemas-upnp-org:service:AVTransport:1"]     );
            //
            if (data.serviceType === "UPnP_Media" && data.attribut === "itemMetadata") {
                this.currentMedia = this.cs.getMediaFromDIDL( data.value as string );
            }
        });
        this.cs.call(this.nf.id, "getMediasStates", []).then( (state) => {
            console.log( "getMediasStates =>", state );
            this.state = state;
            let AVTransport      = this.state["urn:schemas-upnp-org:service:AVTransport:1"],
                RenderingControl = this.state["urn:schemas-upnp-org:service:RenderingControl:1"],
                UPnP_Media       = this.state["UPnP_Media"];
            this.updateRenderingControl ( RenderingControl );
            this.updateAVTransport      ( AVTransport      );
            if ( UPnP_Media && UPnP_Media.itemMetadata ) {
                this.currentMedia = this.cs.getMediaFromDIDL( UPnP_Media.itemMetadata );
                // this.currentMedia.duration = AVTransport.CurrentMediaDuration;
            }
        });
    }
    updateRenderingControl(renderingControl: RenderingControlType) {
        if(!renderingControl) return;
        this.mute   = renderingControl.Mute === "1" || renderingControl.Mute === "true";
        this.volume =+renderingControl.Volume;
    }
    updateAVTransport(AVTransport: AVTransportType) {
        if(!AVTransport) return;
        this.duration = AVTransport.CurrentMediaDuration;
        switch(AVTransport.TransportState) {
            case "STOPPED"          : this.playState = PLAY_STATE.STOP ; break;
            case "PLAYING"          : this.playState = PLAY_STATE.PLAY ; break;
            case "PAUSED_PLAYBACK"  : this.playState = PLAY_STATE.PAUSE; break;
        }
    }
    setVolume(volume: number) {
        // console.log( "setVolume", volume );
        clearTimeout(this.timeoutVol);
        this.timeoutVol = window.setTimeout ( () => this.cs.setVolume(this.nf.id, volume)
                                            , 50 );
    }
    isPlaying() : boolean {return this.playState === PLAY_STATE.PLAY ;}
    isPaused () : boolean {return this.playState === PLAY_STATE.PAUSE;}
    isStopped() : boolean {return this.playState === PLAY_STATE.STOP ;}
    play() : Promise<any> {
        return this.cs.play( this.nf.id );
    }
    pause() : Promise<any> {
        return this.cs.pause( this.nf.id );
    }
    stop() : Promise<any> {
        return this.cs.stop( this.nf.id );
    }
    isMedia(obj: any) : boolean {
        console.log("isMedia", obj);
        return true;
    }
    loadMedia(media: Media) {
        console.log(this.nf.id, "loadMedia", media.serverId, media.mediaId);
        this.cs.loadMedia( this.nf.id, media.serverId, media.mediaId ).then( (rep) => {
            console.log("rep:", rep);
            this.play().then( () => {
                // Subscribe to media server
            });
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
}
