"use strict";

let number=0;
const bbs = document.querySelector('#bbs');
document.querySelector('#post').addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const message = document.querySelector('#message').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'name='+name+'&message='+message,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#message').value = "";
    });
});

document.querySelector('#blockcheck').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: 'start='+0,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
        }
    }
    const url = "/read";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        bbs.innerText = '';
        var count = 1;
        number += response.messages.length;
        for( let mes of response.messages ) {
            console.log( mes );  // 表示する投稿
            let cover = document.createElement('div');
            cover.className = 'cover';
            let number_area = document.createElement("span");
            number_area.className = "number";
            number_area.innerText = count+" ";
            let name_area = document.createElement('span');
            name_area.className = 'name';
            name_area.innerText = mes.name;
            let mes_area = document.createElement('span');
            mes_area.className = 'mes';
            mes_area.innerText = mes.message;
            for(let block_check of response.block_name){
                if(mes.name == block_check.block_name){
                    mes_area.innerText = "キックされたユーザーの投稿です。";
                    break;
                }
            }
            cover.appendChild(number_area);
            cover.appendChild( name_area );
            cover.appendChild( mes_area );

            bbs.appendChild( cover );

            count++;
        }
    })
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: 'start='+0,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
        }
    }
    const url = "/read";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        bbs.innerText = "";
        var count = 1;
        number += response.messages.length;
        for( let mes of response.messages ) {
            console.log( mes );  // 表示する投稿
            let cover = document.createElement('div');
            cover.className = 'cover';
            let number_area = document.createElement('span');
            number_area.className = 'number';
            number_area.innerText = count+' ';
            let name_area = document.createElement('span');
            name_area.className = 'name';
            name_area.innerText = mes.name;
            let mes_area = document.createElement('span');
            mes_area.className = 'mes';
            mes_area.innerText = mes.message;
            cover.appendChild(number_area);
            cover.appendChild( name_area );
            cover.appendChild( mes_area );

            bbs.appendChild( cover );
            count++;
        }
    })
});

document.querySelector('#tencheck').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        let start = value - 10;
        console.log("読み込み開始位置->"+start);
        const params = {
            method: "POST",
            body: 'start='+start,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'               
            }
        }
        const url = "/read";
        fetch( url, params )
        .then( (response) => {
            if( !response.ok ) {
                throw new Error('Error');
            }
            return response.json();
        })
        .then( (response) => {
            bbs.innerText="";
            number += response.messages.length;
            for( let mes of response.messages ) {
                console.log( mes );  // 表示する投稿
                let cover = document.createElement('div');
                cover.className = 'cover';
                let number_area = document.createElement("span");
                number_area.className = "number";
                if(start < 0){
                    start = 0;
                }
                number_area.innerText = (start+1)+ ' ';
                let name_area = document.createElement('span');
                name_area.className = 'name';
                name_area.innerText = mes.name;
                let mes_area = document.createElement('span');
                mes_area.className = 'mes';
                mes_area.innerText = mes.message;
                cover.appendChild(number_area);
                cover.appendChild( name_area );
                cover.appendChild( mes_area );

                bbs.appendChild( cover );
                start++;
            }
        })
    });
});

document.querySelector('#goodcheck').addEventListener('click', () => {
    const params = {
        method: "POST",
        body: 'start='+0,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'               
        }
    }
    const url = "/read";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        bbs.innerText = '';
        var count = 1;
        number += response.messages.length;
        for( let mes of response.messages ) {
            console.log( mes );  // 表示する投稿
            let cover = document.createElement('div');
            cover.className = 'cover';

            let number_area = document.createElement("span");
            number_area.className = "number";
            number_area.innerText = count+" ";

            let name_area = document.createElement('span');
            name_area.className = 'name';
            name_area.innerText = mes.name;

            let mes_area = document.createElement('span');
            mes_area.className = 'mes';
            mes_area.innerText = mes.message;

            let good_area = document.createElement("span");
            good_area.className = "good";
            let good_count = 0;
            for(let good_check of response.good_number){
                if(count == good_check.good_number) good_count++;
            }
            good_area.innerText = "いいね: "+good_count;

            cover.appendChild(number_area);
            cover.appendChild( name_area );
            cover.appendChild( mes_area );
            cover.appendChild(good_area);

            bbs.appendChild( cover );

            count++;
        }
    })
});

document.querySelector('#block').addEventListener('click', () => {
    const block_name = document.querySelector('#block_name').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'block_name='+block_name,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/block_post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#block_name').value = "";
    });
});

document.querySelector('#goodsign').addEventListener('click', () => {
    const good_number = document.querySelector('#good').value;

    const params = {  // URL Encode
        method: "POST",
        body:  'good_number='+good_number,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/good_post";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
        document.querySelector('#good').value = "";
    });
});

document.querySelector('#block_reset').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    console.log( params );
    const url = "/block_reset";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        console.log( response );
    });
});