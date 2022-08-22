//Filter Queries
class ApiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    search(){
        const keyword = this.queryString.keyword?{
            name:{
                $regex:this.queryString.keyword,
                $options:'i'
            }
        }:{};
        this.query=this.query.find({...keyword});
        return this;

    }
    filter(){
      const queryCopy={...this.queryString};
      //remove fields
      const removeFields = ['page','limit','fields','sort','keyword','page'];  
        removeFields.forEach(field => delete queryCopy[field]);
        //price gte lte
        let queryStr=JSON.stringify(queryCopy);
        queryStr=queryStr.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
        this.query.find(JSON.parse(queryStr));
        return this;
    }
    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(',').join(' ');
            this.query.select(fields);
        }else{
            this.query.select('-__v');
        }
        return this;
    }
    pagination( resultPerPage){
        const currentPage = Number(this.queryString.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
       this.query=this.query.skip(skip).limit(resultPerPage);
         return this;
    }
}
export default ApiFeatures;