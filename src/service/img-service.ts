import config from "../../app-config.json" with {type: "json"}

const imgs: Record<string, string> = {};
Object.entries(config.imageLinks).forEach((cat) => {
    if(typeof cat[1] === "string"){
        imgs[cat[0]] = cat[1];
    }else{
        Object.entries(cat[1]).forEach((link) => {
            imgs[cat[0] + "|" + link[0]] = link[1] as string;
        });
    }
});


console.log({imgs});


export default imgs