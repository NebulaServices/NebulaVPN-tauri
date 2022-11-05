class SettingsInterFace { 
    constructor () {
        this.saveAll = 'Incomplete'
        this.saveByElementId = function (_id){
           const element = document.getElementById(_id);
           if (element.checked == true) {
            return
           }
        }
    }
}
var settingsInterface = new SettingsInterFace();