import { Request, Response } from 'express';
import { CreateTableCommand,PutItemCommand,GetItemCommand,UpdateItemCommand,DeleteItemCommand,ScanCommand  } from '@aws-sdk/client-dynamodb';
import { Client } from '../config/connection';

export const createUserTable = async (req: Request, res: Response) => {
      try{
       
        const createTableCommand = new CreateTableCommand({
            TableName: 'users',
            KeySchema: [ 
               // No 'id' in KeySchema for auto-generated ID 
              ],
            AttributeDefinitions: [
              { AttributeName: 'id', AttributeType: 'N' },
              { AttributeName: 'name', AttributeType: 'S' },
              { AttributeName: 'password', AttributeType: 'S' },
            ],
            ProvisionedThroughput: {
              ReadCapacityUnits: 5,
              WriteCapacityUnits: 5,
            },
            BillingMode: 'PAY_PER_REQUEST', 
          });

           
        const client = await Client.send(createTableCommand);
        
        res.json({'Table Created Successfully':client.$metadata})

      }catch(ex){

        res.json({'Error Creating Table': ex })
      }
     
}



export const getUsers = async(req:Request,res:Response)=>{
    try{
        const user = new ScanCommand({ TableName: 'users'});
        const rs = await Client.send(user);
        res.json(rs.Items)  
        
    }catch(ex){
        res.json({'Error Inserting data':ex})
    }
}




export const getUserById = async(req:Request,res:Response)=>{
    try{
        
        const { id } = req.params;
       
        const user = new GetItemCommand({
            TableName: 'users',
            Key: {
                id: { S: id }, 
              },
          });

        const rs = await Client.send(user);
        res.json(rs.Item)  
        
    }catch(ex){
        res.json({'Error Inserting data':ex})
    }
}


export const addUser= async(req:Request,res:Response)=>{
    try{
       
        const {name,password} = req.body;
        const user =  new PutItemCommand({
            TableName:'users',
            Item:{
                name:{S:'name'},
                password:{S:'password'}
            }
        });

        const rs = await Client.send(user);
        res.json(rs)  
        
    }catch(ex){
        res.json({'Error Inserting data':ex})
    }
}



export const updateUser = async(req:Request,res:Response)=>{
    try{
        
        const {id} = req.params;
        const {name,password} = req.body;

        const user = new UpdateItemCommand({
            TableName: 'users',
            Key: {
              id: { S: id }, 
            },
            UpdateExpression: 'SET #name = :name, #password = :password',
            ExpressionAttributeNames: {
              '#name': 'name',
              '#password': 'password',
            },
            ExpressionAttributeValues: {
              ':name': { S: name },
              ':password': { S: password },
            },
            ReturnValues: 'ALL_NEW',
          });

        const rs = await Client.send(user);
        res.json(rs)  
        
    }catch(ex){
        res.json({'Error Inserting data':ex})
    }
}


export const deleteUser = async(req:Request,res:Response)=>{
    try{
        
        const {id} = req.params;
       
        const user = new DeleteItemCommand({
            TableName: 'users',
            Key: {
              id: { S: id }, 
            },
            ReturnValues: 'ALL_NEW',
          });

        const rs = await Client.send(user);
        res.json(rs)  
        
    }catch(ex){
        res.json({'Error Inserting data':ex})
    }
}

