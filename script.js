console.log('====================================');
console.log("Connected");
console.log('====================================');
let xhr = new XMLHttpRequest();
let res_obj;
let quant = 0;
let foc =0;
xhr.open("GET","https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?",true);
xhr.onload = function()
{
    res_obj = JSON.parse(xhr.responseText);//This has the object from the provided JSON file
    let i=0;
    let j =0;
    // document.getElementById("main_image").setAttribute("src",res_obj["product"]["images"]["0"]["src"]);
    // for(i in res_obj["product"]["images"])
    // {
    // }
    document.getElementById("vendor").innerText = res_obj["product"]["vendor"];
    document.getElementById("title").innerText = res_obj["product"]["title"];
    document.getElementById("price").innerText = `$`+Number(res_obj["product"]["price"].substring(1,),10).toFixed(2);
    document.getElementById("compare_at_price").innerHTML = `<del>$`+ Number(res_obj["product"]["compare_at_price"].substring(1,),10).toFixed(2)+`</del>`;
    let percent =  Math.round((1-Number(res_obj["product"]["price"].substring(1,),10).toFixed(2)/Number(res_obj["product"]["compare_at_price"].substring(1,),10).toFixed(2)) *100);
    document.getElementById("percent_off").innerText = `${percent}% off`;

    console.log(percent);
    let diff_colors = res_obj["product"]["options"][0]["values"];
    for (i =0;i<diff_colors["length"];i++)
    {
        document.querySelector(`#colors div:nth-child(${i+1})`).addEventListener("click",(event)=>{
            for (k=0;k<4;k++){
            if(event.target === document.querySelector(`#colors div:nth-child(${k+1})`))
            {
                foc = k;
                console.log(document.querySelector(`#colors div:nth-child(${k+1})`));
                break;
            }
        }
            for (k=0;k<4;k++){
                if(k!=foc){
                    document.querySelector(`#colors div:nth-child(${k+1})`).style.borderStyle = "none";
                    document.querySelector(`#colors div:nth-child(${k+1})`).innerHTML = "<p></p>";
                }
                else{
                document.querySelector(`#colors div:nth-child(${k+1})`).style.borderStyle = "double";
                document.querySelector(`#colors div:nth-child(${k+1})`).innerHTML = "<p>&#10003;</p>";
                }

            }
    }
    );
    }
    for (i =0;i<diff_colors["length"];i++)
    {
        for(j in diff_colors[i])
        {
            document.querySelector(`#colors div:nth-child(${i+1})`).style.backgroundColor = diff_colors[i][j];
        }
    }
    document.getElementById("description").innerHTML = res_obj["product"]["description"];
    document.querySelector("#quant p:nth-child(1)").addEventListener("click",()=>{
        let quantity  = document.querySelector("#quant p:nth-child(2)").innerText;
        if(Number(quantity)>0){
            document.querySelector("#quant p:nth-child(2)").innerText = Number(quantity)-1;
        }
    });
    document.querySelector("#quant p:nth-child(3)").addEventListener("click",()=>{
        let quantity  = document.querySelector("#quant p:nth-child(2)").innerText;
        document.querySelector("#quant p:nth-child(2)").innerText = Number(quantity)+1;
        }
    );
    document.getElementById("cart").addEventListener("click",()=>{
        let individual_quant = Number(document.querySelector("#quant p:nth-child(2)").innerText);
        quant = quant + individual_quant;
        document.getElementById("item_quant").innerText = quant;
        if(quant>0)
        {
            document.getElementById("item_quant").style.visibility ="visible";
            document.getElementById("message").style.visibility ="visible";
            if(foc==0)
                document.querySelector("#message p").innerText = `${individual_quant} Embrace Sideboard with color yellow added to cart`;
            else if(foc == 1)
                document.querySelector("#message p").innerText = `${individual_quant} Embrace Sideboard with color green added to cart`;
            else if(foc ==2)
            document.querySelector("#message p").innerText = `${individual_quant} Embrace Sideboard with color blue added to cart`;
            else
            document.querySelector("#message p").innerText = `${individual_quant} Embrace Sideboard with color pink added to cart`;

        }
        else{
            document.getElementById("item_quant").style.visibility ="hidden";
            document.getElementById("message").style.visibility ="hidden";
        }

    })
}
function img_handler(e) {
    console.log(e.target);
    var thumbnails = document.getElementsByClassName("Thumbnails");
    for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].style.borderWidth = "0px";
        if (e.target === thumbnails[i]) {
            e.target.style.border = "2px solid blue";
            document.getElementById("main_image").setAttribute("src",thumbnails[i].src)
        }
    }
}
xhr.send();