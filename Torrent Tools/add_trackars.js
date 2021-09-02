
'use strict';
function checkMag() {
    let checkMag = document.getElementById('mag_link');
    if (checkMag.value) {
        checkMag.classList.remove('is-invalid');
    } else {
        checkMag.classList.add("is-invalid");
    }
}

function checkList() {
    let checkList = document.getElementById('trak_list');
    if (checkList.value) {
        checkList.classList.remove('is-invalid');
    } else {
        checkList.classList.add("is-invalid");
    }
}




function import_list() {

    document.getElementById('trak_list').value = "lodaing..";

    fetch('https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt')
        .then(response => response.text())
        .then((response) => {
            let imported_list = response;
            document.getElementById('trak_list').value = imported_list;
            document.getElementById('import_list').setAttribute("disabled", "");
            document.getElementById('trak_list').classList.remove('is-invalid');
            document.getElementById('trak_list').classList.add('is-valid');
            document.getElementById('import_list').classList.remove('btn-secondary');
            document.getElementById('import_list').classList.add('btn-outline-success');

        })
}

function checkMagTrue() {
    let checkTrak_list = document.getElementById('trak_list');
    let checkMag_link = document.getElementById('mag_link');

    let TrueMag = checkMag_link.value.toLowerCase();
    let checkTrueMag = TrueMag.includes("magnet");

    if (!checkMag_link.value && !checkTrak_list.value) {
        if (!checkMag_link.value) {
            checkMag_link.classList.add("is-invalid");
        }
        if (!checkTrak_list.value) {
            checkTrak_list.classList.add("is-invalid");
        }
        return false
    }

    if (!checkTrueMag) {
        checkMag_link.classList.add("is-invalid");
        return false
    }
    return true
}

function add_trak() {

    if (!(checkMagTrue())) {
        return
    }


    let mag_link = decodeURIComponent(document.getElementById("mag_link").value);
    let trak_list = document.getElementById("trak_list").value;
    let reEm = trak_list.replace(/(^[ \t]*\n)/gm, "");
    let trak = reEm.split("\n");
    let mag = trak.join('&tr=');
    let theLink = mag_link + "&tr=" + mag;
    document.getElementById('mag').setAttribute("href", theLink);
    document.getElementById('mag_full_link').value = theLink;
    document.getElementById("mag").removeAttribute("disabled");
    document.getElementById("mag").classList.remove("btn-outline-secondary");
    document.getElementById("mag").classList.add("btn-success");
    document.getElementById("copy_mag").removeAttribute("disabled");
    document.getElementById("copy_mag").classList.remove("btn-outline-secondary");
    document.getElementById("copy_mag").classList.add("btn-info");
}

// function back() {
//     document.getElementById('Add_Trackers').classList.add('show');
//     document.getElementById('Add_Trackers').classList.add('active');
//     document.getElementById('Add_Trackers_Done').classList.remove('active');
//     document.getElementById('Add_Trackers_Done').classList.remove('show');
// }

function copy() {
    let copy = document.getElementById('mag_full_link');
    copy.select();
    copy.setSelectionRange(0, 99999);
    document.execCommand("copy");
    copy.classList.add('is-valid');
}

// function edit() {
//     let edit = document.getElementById('mag_full_link');
//     let editBut = document.getElementById('edit_mag');
//     let doneBut = document.getElementById('done_mag');
//     let magBut = document.getElementById('mag');
//     let copyBut = document.getElementById('copy_mag');
//     edit.removeAttribute('disabled');
//     editBut.classList.remove('btn-light');
//     editBut.classList.add('btn-dark');
//     editBut.style.display = 'none';
//     doneBut.style.display = 'block';
//     magBut.setAttribute('disabled', "");
//     magBut.classList.add('disabled');
//     magBut.style.cursor = "not-allowed";
//     copyBut.setAttribute('disabled', "");
//     copyBut.classList.add('disabled');
//     copyBut.style.cursor = "not-allowed";
// }

// function doneEditing() {
//     let edit = document.getElementById('mag_full_link');
//     let editBut = document.getElementById('edit_mag');
//     let doneBut = document.getElementById('done_mag');
//     let magBut = document.getElementById('mag');
//     let copyBut = document.getElementById('copy_mag');
//     edit.setAttribute('disabled', "");
//     editBut.classList.remove('btn-dark');
//     editBut.classList.add('btn-light');
//     doneBut.style.display = 'none';
//     editBut.style.display = 'block';
//     magBut.removeAttribute('disabled', "");
//     magBut.classList.remove('disabled');
//     magBut.style.cursor = "pointer";
//     copyBut.removeAttribute('disabled', "");
//     copyBut.classList.remove('disabled');
//     copyBut.style.cursor = "pointer";
// }

function reset() {

    let trak_list = document.getElementById('trak_list');
    let mag_link = document.getElementById('mag_link');
    trak_list.value = "";
    mag_link.value = "";
    trak_list.classList.remove('is-invalid');
    trak_list.classList.remove('is-valid');
    mag_link.classList.remove('is-invalid');
    mag_link.classList.remove('is-valid');
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