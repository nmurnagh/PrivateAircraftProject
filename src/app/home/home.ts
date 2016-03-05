import {Component, provide, ElementRef, Injector,
    IterableDiffers, KeyValueDiffers, Renderer} from 'angular2/core';
import {DataReader} from '../../services/datareader'; 
import {ModalDialogInstance} from 'angular2-modal/dist/models/ModalDialogInstance';
import {ModalConfig} from 'angular2-modal/dist/models/ModalConfig';
import {Modal} from 'angular2-modal/dist/providers/Modal';
import {ICustomModal} from 'angular2-modal/dist/models/ICustomModal';
import {YesNoModalContent, YesNoModal} from 'angular2-modal/dist/commonModals/yesNoModal';
import {OKOnlyContent, OKOnlyModal} from 'angular2-modal/dist/commonModals/okOnlyModal';
import {DetailDialog, DetailDialogData}  from "../detail/detail";

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.html',
    providers: [DataReader, Modal]
})
export /**
 * name
 */
    class Home {
    privateAirplane: Array<any>
    filteredAirplane: Array<any>
    langSelected: string;
    languages: Array<string>;
    searchColumns: Array<any>;
    selectedColumn: {disp: string,key:string};
    filter: string;
    sorting: string;
    
    public mySampleElement: ElementRef;
    public lastModalResult: string;

    constructor(private dataReader: DataReader, private modal: Modal, private elementRef: ElementRef,
                private injector: Injector, private _renderer: Renderer) {
        this.languages = [];
        this.languages.push("English");
        this.languages.push("French");
        this.langSelected = this.languages[0];
        this.searchColumns = [];
        this.searchColumns.push({disp: "Full Name", key: "FULL_NAME"});
        this.searchColumns.push({disp: "City", key: "CITY"});
        this.searchColumns.push({disp: "Province", key: "PROVINCE_OR_STATE_E"});
        this.searchColumns.push({disp: "Owner Type", key: "TYPE_OF_OWNER_E"});
        this.selectedColumn = this.searchColumns[0];
        this.sorting = "none";
    }

    static modalData = {
        'large': new YesNoModalContent('Simple Large modal', 'Press ESC or click OK / outside area to close.', true),
        'small': new YesNoModalContent('Simple Small modal', 'Press ESC or click OK / outside area to close.', true),
        'yesno': new YesNoModalContent('Simple 2 button custom modal', 'Answer the question', false, "Yes", "No"),
        'key': new YesNoModalContent('Special Exit Key', 'Press q to close.', true),
        'blocking': new YesNoModalContent('Simple Blocking modal', 'You can only click OK to close this modal.', true),
        'inElement':new YesNoModalContent('Simple In Element modal', 'Try stacking more modals, click OK to close.', true)
    };    
    static modalConfigs = {
        'large': new ModalConfig("lg", false, 27),
        'small': new ModalConfig("sm", false, 27),
        'yesno': new ModalConfig("sm", false, 27),
        'key': undefined, // Modal will use default config, which we set at app bootstrap (setting in app bootstrap is optional)
        'blocking': new ModalConfig("lg", true, null), // null for keyboard means no keyboard keys can close the modal.
        'inElement': new ModalConfig("lg", true, null),
        'customWindow': new ModalConfig("lg", true, 27)
    };   

    onLanguage(lang: string) {
        this.langSelected = lang;
    }

    onColumn(column: any) {
        this.selectedColumn = column;
    }
    
    showDetail(data: any){
        this.openDialog(data);
    }    
    
    ngOnInit() {
        this.dataReader.getData()
        .subscribe((data) => {
            this.privateAirplane = data;
            this.filteredAirplane = data;
            console.log('read Data');
        })
    }

    filterChanged() {
        var upperFilter: string;
        if (this.filter && this.privateAirplane) {
            upperFilter = this.filter.toUpperCase();
            let filtered = this.privateAirplane.filter(item => {
                let match = false;
                if (item[this.selectedColumn.key].toUpperCase().indexOf(upperFilter) > -1) {
                    match = true;
                };
                return match;
            });
            this.filteredAirplane = filtered;
        }
        else {
            this.filteredAirplane = this.privateAirplane;
        }
    }
    
    sortBy(column: string) {
        if (this.sorting === "none" || this.sorting === "d") {
            this.sorting = "a";
            this.filteredAirplane.sort((a: any, b: any) => {
            if (a[column] < b[column]) {
                return -1;
            } else if (a[column] > b[column]) {
                return 1;
            } else {
                return 0;
            }
        }); 
        } else {
            this.sorting = "d";
            this.filteredAirplane.sort((a: any, b: any) => {
            if (a[column] > b[column]) {
                return -1;
            } else if (a[column] < b[column]) {
                return 1;
            } else {
                return 0;
            }
        });
        }
        return this.filteredAirplane
    }
    
    openDialog(data: any) {
        let dialog:  Promise<ModalDialogInstance>;
        let component = DetailDialog;
        let dialogData = new DetailDialogData(data);
        
        let bindings = Injector.resolve([
            provide(ICustomModal, {useValue: dialogData}),
            provide(IterableDiffers, {useValue: this.injector.get(IterableDiffers)}),
            provide(KeyValueDiffers, {useValue: this.injector.get(KeyValueDiffers)}),
            provide(Renderer, {useValue: this._renderer})
        ]);

        if ('customWindow' === 'inElement') {
            dialog = this.modal.openInside(
                <any>component,
                this.mySampleElement,
                'myModal',
                bindings,
                Home.modalConfigs['customWindow']);
        } else
            dialog = this.modal.open(
                <any>component,
                bindings,
                Home.modalConfigs['customWindow']);


        dialog.then((resultPromise) => {
            return resultPromise.result.then((result) => {
                this.lastModalResult = result;
            }, () => this.lastModalResult = 'Rejected!');
        });
    }      
}