import Task from '../models/Task.js'

export const CreateTask = async (req, res, next) =>{
  try{
    const { id } = req.user;
    const task = new Task ({ 
      ...req.body, 
      userId: id
    })
    const savedTask = await task.save();
    return res.status(201).json({task: savedTask })
  }catch(err){
    next(err)
  }
};

export const UpdateTask = async (req, res, next) =>{
  try{
    const { id } = req.params
    const task = await Task.findByIdAndUpdate( id, {...req.body}, {new: true})
    return res.status(201).json({task})

  }catch(err){
    next(err)
  }
};

export const GetTask = async (req, res, next) =>{
  try{
    const { id } = req.params
    const task = await Task.findById(id)
    return res.status(201).json({task})
  }catch(err){
    next(err)
  }
}

export const GetTasks = async (req, res, next) =>{
  try{
    const type = req.query?.type
    const { id } = req.user
  
    if(type){
      var tasks = await Task.find({userId: id , type })
    }else{
      var tasks = await Task.find({userId: id })
    }
    return res.status(201).json({tasks})
  
  }catch(err){
    next(err)
  }
}

export const DeleteTask = async (req, res, next) =>{
  try{
   const { id } = req.params
   const task = await Task.findByIdAndDelete(id)
    return res.status(201).json({task})
  
  }catch(err){
    next(err)
  }
}

