const api = "https://muvi.cotnw.tk"
const sideCard = document.getElementsByClassName('Vrkhme')[0]

let inflatedDownloads = ''

const createElement = (options) => {
    options.forEach(e => {
        let inflatedDownloadOptions = ''
        e.downloadOptions.forEach(d => {
            if(e.downloadOptions.indexOf(d) > 0) {
                inflatedDownloadOptions += `<a href="${d.magnet}" target="_blank"><div class="xlBGCb ellip" style="border: 1px solid #ebebeb; border-radius: 16px; height: 20px; width: 60px; text-align: center; color: rgba(0,0,0,.87);padding-top: 5px; margin-left: 10px;">${d.quality}</div></a>`
            } else {
                inflatedDownloadOptions += `<a href="${d.magnet}" target="_blank"><div class="xlBGCb ellip" style="border: 1px solid #ebebeb; border-radius: 16px; height: 20px; width: 60px; text-align: center; color: rgba(0,0,0,.87);padding-top: 5px;">${d.quality}</div></a>`
            }
        })
        
        if(options.indexOf(e) == 0) {
            inflatedDownloads += `
                <div class="PZPZlf MRfBrb kno-vrt-t" data-rentity="" style="width:500px;">
                    <div style="display: flex; flex-flow: row wrap; align-items: center; border-bottom: 1px solid rgba(0,0,0,.12); border-top: 1px solid rgba(0,0,0,.12);margin-left: -15px; padding: 10px; padding: 15px; padding-top: 10px; padding-bottom: 10px; ">
                        <div>
                            <div style="width: 150px;">${e.title}</div>
                            <div class="xlBGCb ellip">${e.source}</div>
                        </div>
                        <div style="display: flex; flex-flow: row wrap; align-items: center; margin-top: 10px; margin-bottom: 10px; margin-left: 20px">
                            ${inflatedDownloadOptions}
                        </div>
                    </div>
                </div><br>
            `
        } else {
            inflatedDownloads += `
                <div class="PZPZlf MRfBrb kno-vrt-t" data-rentity="" style="width:500px;">
                    <div style="display: flex; flex-flow: row wrap; align-items: center; border-bottom: 1px solid rgba(0,0,0,.12); margin-left: -15px; padding: 10px; padding: 15px; padding-top: 10px; padding-bottom: 10px; ">
                        <div>
                            <div style="width: 150px;">${e.title}</div>
                            <div class="xlBGCb ellip">${e.source}</div>
                        </div>
                        <div style="display: flex; flex-flow: row wrap; align-items: center; margin-top: 10px; margin-bottom: 10px; margin-left: 20px">
                            ${inflatedDownloadOptions}
                        </div>
                    </div>
                </div><br>
            `
        }
    })
    
    const downloadsElement = `
        <div class="sATSHe">
            <div class="LuVEUc XleQBd B03h3d P6OZi V14nKc ptcLIOszQJu__wholepage-card wp-ms" data-hveid="CDoQAQ">
                <div class="UDZeY OTFaAf">
                    <div class="wDYxhc NFQFxe" data-attrid="kc:/film/film:cast" data-md="13" lang="en-IN" data-ved="2ahUKEwjr5p2bhfHwAhXy7HMBHWT9C20QkCkwMHoECCAQAA">
                        <div class="Ss2Faf zbA8Me V88cHc qLYAZd" aria-level="3" role="heading">
                            <div class="PfS8Ld"></div>
                            <div class="VLkRKc">Download options</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="zVvuGd MRfBrb" data-hveid="CCAQAw" style="margin-top: 0px;">
                ${inflatedDownloads}
            </div>
        </div>
    ` 

    return downloadsElement
}

if(sideCard != undefined) {
    const isMovie = sideCard.innerHTML.includes('film')
    if(isMovie) {
        const movieName = document.getElementsByClassName('SPZz6b')[0].getElementsByTagName('span')[0].innerHTML
        fetch(`${api}/movies?q=${encodeURIComponent(movieName)}`).then(res => {
            if(res.status == 404) {
                console.log("none")
            } else {
                res.json().then(resp => {
                    const options = []
                    resp.forEach(e => {
                        const downloadOptions = []
                        e.torrents.forEach(t => { 
                            if(t.quality.includes('720p')) {
                                t.quality = '720p'
                            }
                            if(t.quality.includes('1080p')) {
                                t.quality = '1080p'
                            }
                            downloadOptions.push({ magnet: t.magnet, quality: t.quality})
                        })
                        const optionObject = {
                            title: e.title,
                            source: e.source,
                            downloadOptions
                        }
                        options.push(optionObject)
                    })
                    const downloadsElement = createElement(options)
                    const secondElement = document.getElementsByClassName('sATSHe')[2].innerHTML
                    document.getElementsByClassName('sATSHe')[2].innerHTML = downloadsElement + secondElement
                })
            }
        })
        
    }
}