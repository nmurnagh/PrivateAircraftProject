import {Component, Input} from 'angular2/core';
import {ICustomModal, ICustomModalComponent} from 'angular2-modal/dist/models/ICustomModal';
import {ModalDialogInstance} from 'angular2-modal/dist/models/ModalDialogInstance';

export class DetailDialogData{
    constructor(
        public data: any
    ) {}
}

@Component({
    selector: 'modal-content',
    templateUrl: 'app/detail/detail.html'
})
export /**
 * DetailDialog
 */
class DetailDialog  implements ICustomModalComponent{
    dialog: ModalDialogInstance;
    context: DetailDialogData;
    public wrongAnswer: boolean;
    
    constructor(dialog: ModalDialogInstance, modelContentData: ICustomModal) {
        this.dialog = dialog;
        this.context = <DetailDialogData>modelContentData;
       console.log(this.context);
    }
    
    close(){       
        this.dialog.close();
    }
    
    onKeyUp(value: any) {
        this.dialog.close();
    }
    
    // beforeDismiss(): boolean {
    //     return true;
    // }

    // beforeClose(): boolean {
    //     return true;
    // }
        
}