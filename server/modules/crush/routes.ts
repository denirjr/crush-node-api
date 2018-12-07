import CrushController from './controller';
import * as httpStatus from 'http-status';

const sendResponse = function(res, statusCode, data) {
    res.status(statusCode).json({'result': data});
}

class CrushRoutes {

    constructor(){}

    getAll(req, res) {
        CrushController
        .getAll()
        .then(crushes => sendResponse(res, httpStatus.OK, crushes))
        .catch(err => console.error.bind(console, 'Erro:' + err));
    };

    getById(req, res) {
        const id = {_id: req.params.id}
        if(!id) {
            sendResponse(res, httpStatus.OK, 'Crush não encontrado');
        }
        CrushController
        .getByID(id)
        .then(crush => sendResponse(res, httpStatus.OK, crush))
        .catch(err => console.error.bind(console, 'Erro: '+ err));
    };

    create(req, res){
        const crush = req.body;
        CrushController
        .create(crush)
          .then(() => {
            res.json(crush);
          })
          .catch(() => {
            res.status(400).send("unable to save to database");
          });
      }
       

    update(req, res) {
        const id = {_id: req.params.id}
        const crush = req.body;
        
        CrushController
        .update(id, crush)
        .then(crush => sendResponse(res, httpStatus.OK, "Crush alterado!"))
        .catch(err => console.error.bind(console, 'Erro: '+ err));
    };

    delete(req, res) {

        const id = {_id: req.params.id}

        CrushController
        .delete(id)
        .then(result => sendResponse(res, httpStatus.OK, result))
        .catch(err => console.error.bind(console, 'Erro: '+ err));
      }
      
    }

    

export default new CrushRoutes();