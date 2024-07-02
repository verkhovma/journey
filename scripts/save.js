export async function import_save(){
    let file_selector = document.getElementById("file_selector")
    file_selector.onchange = function(e){
        let file = e.target.files[0]

        let reader = new FileReader()
        reader.readAsText(file)

        reader.onload = function() {
            let data_json = JSON.parse(reader.result)
            localStorage.setItem("user_name", data_json[0])
            localStorage.setItem("map_dict", data_json[1])
        }

        reader.onerror = function() {
            console.log(reader.error)
        }
    }
    file_selector.click()
}

export async function export_save(){
    let savename = "journey-save.json"
    let save = new File([
        JSON.stringify([
            localStorage.getItem("user_name"),
            localStorage.getItem("map_dict")
        ])
    ],
    savename)

    let downloader = document.createElement('a')
    downloader.href = window.URL.createObjectURL(save);
    downloader.setAttribute('download', savename)
    downloader.style.display = 'none';

    document.body.appendChild(downloader)
    downloader.click()
    document.body.removeChild(downloader)
}
