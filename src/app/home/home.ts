import {Component} from 'angular2/core';
import {DataReader} from '../../services/datareader';
import { FilterTextboxComponent } from './filterTextbox';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.html',
    providers: [DataReader],
    directives: [FilterTextboxComponent]
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

    constructor(private dataReader: DataReader) {
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
    }

    onLanguage(lang: string) {
        this.langSelected = lang;
    }

    onColumn(column: any) {
        this.selectedColumn = column;
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
}