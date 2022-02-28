import DEFAULT_TOKEN_LIST from 'config/constants/tokenLists/tokenlist.json'

const toRename = {
    '0xf5ad6f6edec824c7fd54a66d241a227f6503ad3a':{name:"Callisto Network",symbol:"CLO"},
    '0x9fae2529863bd691b4a7171bdfcf33c7ebb10a65':{name:"SOY Finance token",symbol:"SOY"},
    '0xccc766f97629a4e14b3af8c91ec54f0b5664a69f':{name:'Wrapped ETC',symbol:"ccETC"},
    '0xccde29903e621ca12df33bb0ad9d1add7261ace9':{name:'Wrapped BNB',symbol:"ccBNB"},
    '0xcc208c32cc6919af5d8026dab7a3ec7a57cd1796':{name:'Wrapped Ethereum',symbol:"ccETH"},
    '0xcc10a4050917f771210407df7a4c048e8934332c':{name:'Wrapped LINA',symbol:'ccLINA'},
    '0xcc78d0a86b0c0a3b32debd773ec815130f9527cf':{name:'Wrapped BNB (old contract)',symbol:"ccBNB"},
    '0xcc8b04c0f7d0797b3bd6b7be8e0061ac0c3c0a9b':{name:'Wrapped RACA',symbol:'ccRACA'},
    '0xccec9f26f52e8e0d1d88365004f4f475f5274279':{name:'Wrapped BAKE',symbol:'ccBAKE'},
    '0xcc1530716a7ebecfdc7572edcbf01766f042155c':{name:'Wrapped REEF',symbol:'ccREEF'},
    '0xccebb9f0ee6d720debccee42f52915037f774a70':{name:'Wrapped WSG',symbol:'ccWSG'},
    '0xcc099e75152accda96d54fabaf6e333ca44ad86e':{name:'Wrapped TWT',symbol:'ccTWT'},
    '0xcc2d45f7fe1b8864a13f5d552345eb3f5a005fed':{name:'Wrapped Cake',symbol:'ccCake'},
    '0xcc50d400042177b9dab6bd31ede73ae8e1ed6f08':{name:'Wrapped TON',symbol:'ccTON'},
    '0xcc45afedd2065edca770801055d1e376473a871b':{name:'Wrapped XMS',symbol:'ccXMS'}
}
DEFAULT_TOKEN_LIST.tokens.forEach(function (item) {
    if (!(item.address.toLocaleLowerCase() in toRename)){
        toRename[item.address.toLocaleLowerCase()] = {'name':item.name, 'symbol': item.symbol}
    }
 });
    
export function renameTokens(object){
    if(object !== undefined && Object.prototype.hasOwnProperty.call(object, 'address')){
        return {...object, ...toRename[object.address]}
    }
    return object
}

export function renameTokenDatas(tokens){

    const tokenDatas = Object.keys(tokens).map((key) => {
            const objClone = tokens[key];
            return { ...objClone, data: renameTokens(objClone.data) };
        });
    return tokenDatas
}

export function renamePool(object){
    if(object !== undefined && Object.prototype.hasOwnProperty.call(object, 'token0') && Object.prototype.hasOwnProperty.call(object, 'token1')){
        let token0Clone = {...object.token0}
        if (object.token0.address in toRename){
            if (Object.prototype.hasOwnProperty.call(toRename[object.token0.address], 'symbol')){
                token0Clone = {...token0Clone,symbol: toRename[object.token0.address].symbol,name: toRename[object.token0.address].name}
            }
        }
        let token1Clone = {...object.token1}
        if (object.token1.address in toRename){
            if (Object.prototype.hasOwnProperty.call(toRename[object.token1.address], 'symbol')){
                token1Clone = {...token1Clone,symbol: toRename[object.token1.address].symbol,name: toRename[object.token1.address].name}
            }
        }

        return {...object,
            token0:token0Clone,
            token1:token1Clone
        }
    }

    return object
}

export function renamePools(pools){
    const poolDatas = Object.keys(pools).map((key) => renamePool(pools[key]));
    return poolDatas
}

export function renameTransactions(txs,idx=-1){
    if (idx===-1){

        if (txs !== undefined){
            const txsClone = txs.map((tx) => {
                    let txClone = { ...tx };
                    if (tx.token0Address in toRename) {
                        txClone = { ...txClone, token0Symbol: toRename[tx.token0Address].symbol };
                    }
                    if (tx.token1Address in toRename) {
                        txClone = { ...txClone, token1Symbol: toRename[tx.token1Address].symbol };
                    }
                    return txClone;
                });
            return txsClone
        }

    } else if (txs[idx] !== undefined){
            const txsClone = txs[idx].map((tx) => {
                    let txClone = { ...tx };
                    if (tx.token0Address in toRename) {
                        txClone = { ...txClone, token0Symbol: toRename[tx.token0Address].symbol };
                    }
                    if (tx.token1Address in toRename) {
                        txClone = { ...txClone, token1Symbol: toRename[tx.token1Address].symbol };
                    }
                    return txClone;
                });
            return [txsClone,txs[1]]
    }

    return txs
}