const Joi = require('joi');
const Feedback = require('../../model/feedback');

const feedbackRequestSchema=Joi.object({
    feedback: Joi.string().required(),
    rating:Joi.number().required()
});

exports.submitFeedback= async(req,resp)=>{
    let requestBody;

    try{
        requestBody=await feedbackRequestSchema.validateAsync(req.body);
    }catch(ex){
        throw ({httpStatus:400,message:ex.details[0].message});
    }

    if(requestBody.rating<0 || requestBody.rating>5){
        throw({httpStatus:400, message:"Invalid rating value"})
    }

    let newFeedback=new Feedback({
        feedback:requestBody.feedback,
        rating:requestBody.rating
    });

    newFeedback =await newFeedback.save();

    return resp.status(200).send('OK');
}

