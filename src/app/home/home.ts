import {Component} from 'angular2/core';
import {DataReader} from '../../services/datareader';

@Component({
    selector: 'home',
     templateUrl: 'app/home/home.html',
     providers: [DataReader]
})
export /**
 * name
 */
class Home {
    privateAirplane: Array<any>
    
    constructor(private dataReader: DataReader) {
        
      
    }
    
    ngOnInit() {
        this.dataReader.getData()
        .subscribe((data) => {
            this.privateAirplane = data;
            console.log('read Data');
        })
    }
}