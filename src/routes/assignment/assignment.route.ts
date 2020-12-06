import { logger } from '@/services';
import { NextFunction, Request, Response, } from 'express';
import { BaseRoute } from '../route';
import { Types, Mongoose } from 'mongoose';

import { IAssignment } from '../../interface/assignment'
import { Assignment } from '../../schema/assignment'


import * as swaggerJsDoc from "swagger-jsdoc";
import * as swaggerUI from "swagger-ui-express";
const swaggerOptions: any = {
    explorer: true,
    swaggerDefinition: {
        info: "Kaplan assignment API",
        version: "1.0.0"
    },
    apis: ["./routes/index.ts"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

/**
 * @api {get} /
 * @apiName DeliveryRequest
 * @apiGroup DeliveryRequest
 *
 * @apiSuccess {String} type Json Type.
 */
export class AssignmentRoute extends BaseRoute {
    public static path = '/assignment';
    private static instance: AssignmentRoute;

    /**
     * @class AssignmentRoute
     * @constructor
     */
    public constructor() {
        super();
        this.CreateNewAssignment = this.CreateNewAssignment.bind(this);
        this.init();
    }

    static get router() {
        if (!AssignmentRoute.instance) {
            AssignmentRoute.instance = new AssignmentRoute();
        }
        return AssignmentRoute.instance.router;
    }

    private init() {
        // log
        logger.info('[AssignmentRoute] Creating AssignmentRoute route.');

        // add index page route
        this.router.use('/api-docs', swaggerUI.serve);
        this.router.get('/api-docs', swaggerUI.setup(swaggerDocs));
        this.router.get('/list', this.list);
        this.router.post('/create', this.CreateNewAssignment);
        this.router.get('/search', this.searchAssignmentByTags);
        this.router.put('/update/:id', this.UpdateAssignment);
        this.router.put('/add-tags/:id', this.AddTags);
        this.router.delete('/delete/:id', this.DeleteAssignment);
        this.router.get('/:id', this.Details);
    }

    /**
     * 
     * @swagger
     * /list:
     *   get:
     *     description: Get all assignment
     *     responses:
     *          200
     *             description: Success
     */
    private async list(req: Request, res: Response, next: NextFunction) {
        try {
            let query: Array<object> = [
                { $match: { deleted: { $ne: 1 } } },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        type: 1,
                        tags: 1,
                        createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    }
                },
                { $sort: { createdAt: -1 } }
            ]
            const response: Array<any> = await Assignment.aggregate(query);
            res.json({ status: 200, data: response })
        } catch (error) {
            next(error)
        }
    }

    /**
     * @swagger
     * @param req 
     * @param res 
     * @param next 
     */
    private async Details(req: Request, res: Response, next: NextFunction) {
        try {
            let query: Array<object> = [
                { $match: { _id: Types.ObjectId(req.params.id) } },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        type: 1,
                        tags: 1,
                        createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    }
                }
            ]
            const response: Array<any> = await Assignment.aggregate(query);
            res.json({ status: 200, data: response[0] })
        } catch (error) {
            next(error)
        }
    }

    private async searchAssignmentByTags(req: Request, res: Response, next: NextFunction) {
        try {
            let query: Array<object> = [
                { $match: { $text: { $search: req.query.key } } },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        description: 1,
                        type: 1,
                        tags: 1,
                        createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    }
                },
                { $sort: { createdAt: -1 } }
            ]
            const response: Array<any> = await Assignment.aggregate([query]);
            res.json({ code: 200, data: response })
        } catch (error) {
            next(error)
        }
    }

    private async CreateNewAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            FormatRequestData(req.body);
            if (await AssignmentExist({ uniqueTitle: req.body.uniqueTitle })) {
                res.status(400).json({ code: 400, error: 'Assignment already exist!.', })
            } else {
                let newAssignment = new Assignment(req.body);
                await Create(res, newAssignment)
            }
        } catch (error) {
            next(error)
        }
    }

    public async UpdateAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            unSetDataWhichIsNotRequired(req);
            FormatRequestData(req.body);
            if (await AssignmentExist({ _id: { $ne: Types.ObjectId(req.params.id) }, uniqueTitle: req.body.uniqueTitle })) {
                res.status(400).json({ code: 400, error: 'Assignment already exist!.', })
            } else {
                await Update(req, res, req.body)
            }

        } catch (error) {
            next(error)
        }
    }

    public async AddTags(req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.body.tags || req.body.tags.length === 0) {
                res.status(400).json({ code: 400, message: 'Tags are required.' })
            } else {
                await AddTags(req, res);
            }
        } catch (error) {
            next(error)
        }
    }

    public async DeleteAssignment(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await Assignment.updateOne({ _id: Types.ObjectId(req.params.id) }, { $set: { deleted: 1 } });
            if (response.nModified > 0) {
                res.json({
                    code: 200,
                    message: 'Succesfully deleted!.',
                })
            } else {
                res.json({
                    code: 500,
                    message: 'Delete not successfull!. Please check the id',
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

const Update = async (req: Request, res: Response, data: IAssignment) => {
    const response = await Assignment.updateOne({ _id: Types.ObjectId(req.params.id) }, { $set: req.body });
    if (response.nModified > 0) {
        res.json({
            code: 200,
            message: 'Succesfully updated!.',
        })
    } else {
        res.json({
            code: 500,
            message: 'Update not successfull!. Please check the request data',
        })
    }
}

const Create = async (res: Response, data: IAssignment | any) => {
    const response = await data.save()
    res.json({ code: 200, message: 'Succesfully created!.', data: response })
}

const AssignmentExist = async (query: Object) => await Assignment.findOne(query);

function unSetDataWhichIsNotRequired(req) {
    delete req.body._id;
    delete req.body.createdAt;
}

async function AddTags(req: Request, res: Response) {
    const condition: Object = { _id: Types.ObjectId(req.params.id) };
    const query: Object = { $push: { tags: { $each: req.body.tags } }, upsert: true };
    const response: any = await Assignment.updateOne(condition, query);
    if (response.nModified > 0) {
        res.json({ code: 200, message: 'Succesfully updated!.', });
    } else {
        res.status(500).json({ code: 500, message: 'Update not successfull!. Please check the request data', });
    }
}

function FormatRequestData(data: IAssignment) {
    if (data && data.title) data.title = data.title.trim();
    if (data && data.title) data.uniqueTitle = data.title.toLowerCase().trim()
    if (data && data.type) data.type = data.type.trim();
    if (data && data.description) data.description = data.description.trim();
}

