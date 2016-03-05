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
    langSelected: string;
    languages: Array<string>;
    
    constructor(private dataReader: DataReader) {
        this.languages = [];
        this.languages.push("English");
        this.languages.push("French");
        this.langSelected = this.languages[0];                 
    }
    
    onLanguage(lang: string){
       this.langSelected = lang;
    }
    
    ngOnInit() {
        this.dataReader.getData()
        .subscribe((data) => {
            this.privateAirplane = data;
            console.log('read Data');
        })
    }
}