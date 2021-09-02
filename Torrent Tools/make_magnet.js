function checkHash() {
    let checkHash = document.getElementById('torrent_hash');
    if (checkHash.value) {
        checkHash.classList.remove('is-invalid');
    } else {
        checkHash.classList.add("is-invalid");
        return false
    }
}


function make(){

    if((checkHash()) == false){
        return;
    }

    let theLink = "";
    let baseUrl = "magnet:?xt=urn:btih:";
    let hash = document.getElementById("torrent_hash").value;
    let name = document.getElementById("torrent_name").value;

    let trak_list = document.getElementById("trak_list").value;
    let reEm = trak_list.replace(/(^[ \t]*\n)/gm, "");
    let trak = reEm.split("\n");
    let mag = trak.join('&tr=');

    if(name){
        theLink = baseUrl + hash + "&dn=" + name + "&tr=" + mag;
    }else{
        theLink = baseUrl + hash + "&tr=" + mag;
    }

    

    document.getElementById('mag').setAttribute("href", theLink);
    document.getElementById('mag_full_link').value = theLink;
    document.getElementById("mag").removeAttribute("disabled");
    document.getElementById("mag").classList.remove("btn-outline-secondary");
    document.getElementById("mag").classList.add("btn-success");
    document.getElementById("copy_mag").removeAttribute("disabled");
    document.getElementById("copy_mag").classList.remove("btn-outline-secondary");
    document.getElementById("copy_mag").classList.add("btn-info");

}


function resetM() {

    let torrent_hash = document.getElementById('torrent_hash');
    let torrent_name = document.getElementById('torrent_name');
    trak_list.value = "";
    torrent_hash.value = "";
    torrent_name.value = "";
    torrent_name.classList.remove('is-invalid');
    torrent_name.classList.remove('is-valid');
    document.getElementById('import_list').removeAttribute("disabled");
    document.getElementById('import_list').classList.add('btn-secondary');
    document.getElementById('import_list').classList.remove('btn-outline-success');

    document.getElementById("mag").setAttribute("disabled","");
    document.getElementById("mag").classList.add("btn-outline-secondary");
    document.getElementById("mag").classList.remove("btn-success");
    document.getElementById("copy_mag").setAttribute("disabled","");
    document.getElementById("copy_mag").classList.add("btn-outline-secondary");
    document.getElementById("copy_mag").classList.remove("btn-info");
    document.getElementById("mag_full_link").value = "";

}
