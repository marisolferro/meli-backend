
import axios from 'axios'

//End Pont Mercado Libre
const apiClient = axios.create({
    baseURL: 'https://api.mercadolibre.com',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {

    list: async (req,res,next) =>{
        try {

            let q = "";
            if (typeof req.query.q != "undefined")
                q = req.query.q;

            let items = await apiClient.get("/sites/MLA/search?q="+q);
            items = items.data;

            //Transforma los resultados de la búsqueda: 
            //No encontré los datos de CATEGORIA en el JSON de endPoint de Mercado Libre. Sólo un catálogo de CATEGORIAS para realizar filtros de búsqueda
            var result = {
                author: {
                    name: "marisol",
                    lastname: "ferro",
                },
                categories: ["Electrónica, Audio y Video", "Ipod", "Reproductores", "iPod touch", "32 GB"],
                items: []
            }
            
            items.results.map(function(item){

                let body = {
                    id: item.id,
                    title:item.title,
                    price: {
                        currency: item.currency_id,
                        amount: item.price,
                        decimals: 0
                    },
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: item.shipping.free_shipping,
                    address: item.address.state_name,
                };

                result.items.push(body);
            });
            

            res.status(200).json(result);

        } catch (e){

            res.status(500).send({
                message:'An error has occurred'
            });
            next(e);
        }
    },  

    find: async (req,res,next) =>{
        try {

            var id = req.params.id;

            let item = await apiClient.get("/items/"+id);
            let description = await apiClient.get("/items/"+id+"/description");

            item = item.data; 
            description = description.data; 

            const picture = item.pictures.length > 0 ? item.pictures[0].url : ''
            const free_shipping = item.shipping.free_methods.length > 0 ? item.shipping.free_methods[0].rule.free_shipping_flag : false

            //Transforma los resultados de la búsqueda: 
            const result = {
                author: { //No encontré los datos de AUTOR en el JSON de endPoint de Mercado Libre
                    name: "marisol", 
                    lastname: "ferro",
                },
                item: {
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: item.currency_id,
                        amount: item.price,
                        decimals: 0,
                    },
                    picture: picture,
                    condition: item.condition,
                    free_shipping: free_shipping,
                    sold_quantity: item.sold_quantity,
                    description: description.plain_text,
                }
            };

            res.status(200).json(result);
            
        } catch (e){

            res.status(e.response.status).send({
                message:"Item with id "+ id +" not found",
                error: "not_found",
                status: 404,
            });
            next(e);
        }
    },  

}