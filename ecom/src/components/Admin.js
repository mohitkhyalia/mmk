import React ,{ useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useProductsContext } from '../context/ApiContext';
import { useSaleContext } from '../context/SaleContext';


export default function Admin() {

    const { isstaff ,suserData ,getuser} = useAuth();
    const { products, loading ,fetchProducts} = useProductsContext();
    const { sale_data,sale_title,sLoading,salepsot,sale,salepatcht,saledeletet} = useSaleContext();


    const [productpg, setProductpg] = useState(false);
    const [userpg, setUserpg] = useState(false);
    const [uSearchInput, setUSearchInput] = useState('');
    const [uopt,setUopt] = useState();
    const [uRevalu,setURevalu] = useState();
    const [searchInput, setSearchInput] = useState('');
    const [revalu,setRevalu]=useState()
    const [opt,setOpt]=useState();
    const [urs,setUrs] = useState();
    const [salepg, setSalepg] = useState(false);
    const [SSearchInput, setSSearchInput] = useState('');
    const [sopt,setSopt] = useState();
    const [sRevalu,setSRevalu] = useState();



    const productchange =()=>{
        setProductpg(true)
        setUserpg(false)
        setSalepg(false)
    }

    const userchange =()=>{
        setProductpg(false)
        setUserpg(true)
        setSalepg(false)
    }
    const salechange =()=>{
      setProductpg(false)
      setUserpg(false)
      setSalepg(true)
  }

    const searchfun = () => {
        console.log(searchInput);
        const rv = products.filter((product) =>String(product[opt]) === searchInput);
        
        const rrv = rv.map((product) => ({
            "id":product.id,
          "name": product.name,
          "price": product.price,
          "cato": product.cato,
          "sale": product.sale,
          "discount": product.discount,
          "size": product.size,
          "rating": product.rating,
          "featured":product.featured,
          "dec": product.dec,
          "image": product.image,
          "imageone": product.imageone,
          "imagetwo": product.imagetwo,
          "imagethree": product.imagethree,
          
          
        }));
        const formattedDetails = JSON.stringify(rrv, null, 5); // Converts the array to a pretty-printed JSON string
        
        setRevalu(formattedDetails);
      };

      
    
      const handleProductpost = async () => {
        try {
          const client = axios.create({
            baseURL: 'http://127.0.0.1:8000',
          });
      
          const rd =JSON.parse(revalu);
          console.log(rd);
          const response = await client.post('/api/product/', rd);
          alert('recorded added')
          fetchProducts();
        } catch (error) {
          // Handle error
          console.error('Error adding product:', error);
        }
      };

      const handleProductupdate = async () => {
        try {
          const client = axios.create({
            baseURL: 'http://127.0.0.1:8000',
          });
      
          const rd =JSON.parse(revalu);
          console.log(rd);
          const response = await client.patch('/api/product/', rd);
          alert('recorded updated')
          fetchProducts();
        } catch (error) {
          // Handle error
          console.error('Error adding product:', error);
        }
      };

      const handleProductdelete = async () => {
        try {
          const client = axios.create({
            baseURL: 'http://127.0.0.1:8000',
          });
      
          const rd =JSON.parse(revalu);
          const productId =rd[0].id
          
          const response = await client.delete(`/api/product/?id=${productId}`);
          alert('recorded deleted')
          console.log(response);
          fetchProducts();
        } catch (error) {
          // Handle error
          console.error('Error adding product:', error);
        }
      };



    //*************************************user***********************************
    const storedToken = window.localStorage.token;

    const usearchfun = async () => {
        console.log(suserData);
        
    
          const rv = suserData.filter((user) => String(user[uopt]) === uSearchInput);
      
          const rrv = rv.map((user) => ({
            "id": user.id,
            "name": user.name,
            "country":user.country,
            "email":user.email,
            "gen":user.gen,
            "addr":user.addr,
            "is_staff":user.is_staff,
            "mob":user.mob,
            "noti":user.noti,
            "pincode":user.pincode
          }));
      
          const formattedDetails = JSON.stringify(rrv, null, 5);
          setURevalu(formattedDetails);
      };
      
      const handleUserpost = async () => {
        try {
          const client = axios.create({
            baseURL: 'http://127.0.0.1:8000',
          });
          const accessToken = JSON.parse(storedToken).access;
          const rd =JSON.parse(uRevalu);
          console.log(rd);
          const response = await client.post('/api/user/', rd,{ credentials:'include',headers: {
            Authorization: `Bearer ${accessToken}`,
          },});
          alert('recorded added')
          getuser();
        } catch (error) {
          // Handle error
          console.error('Error adding product:', error);
        }
      };

      const handleUserupdate = async () => {
        try {
          const client = axios.create({
            baseURL: 'http://127.0.0.1:8000',
          });
          const accessToken = JSON.parse(storedToken).access;
          const rd =JSON.parse(uRevalu);
          console.log(rd);
          const response = await client.patch('/api/user/', rd,{ credentials:'include',headers: {
            Authorization: `Bearer ${accessToken}`,
          },});
          alert('recorded updated')
          getuser();
        } catch (error) {
          // Handle error
          console.error('Error adding product:', error);
        }
      };

    // *********************sale**************************

    const salesearchfun = () => {
      console.log(SSearchInput);
      const rv = sale_data.filter((product) =>String(product[sopt]) === SSearchInput);
      
      const rrv = rv.map((sale) => ({
          "id":sale.id,
        "name": sale.name,
        "start_date": sale.start_date,
        "end_date": sale.end_date,
        "sale": sale.sale,
        
        
      }));
      const formattedDetails = JSON.stringify(rrv, null, 5); // Converts the array to a pretty-printed JSON string
      
      setSRevalu(formattedDetails);
    };

    
  
    const handleSalepost = async () => {
      
    
        const rd =JSON.parse(sRevalu);
        console.log(rd);
        salepsot(rd)
        alert('recorded updated')
        sale();
      
    };

    const handleSaleupdate = async () => {
     
    
        const rd =JSON.parse(sRevalu);
        console.log(rd);
        salepatcht(rd)
        alert('recorded updated')
        sale();
      
    };

    const handleSaledelete = async () => {
      
        const rd =JSON.parse(sRevalu);
        console.log('======>rd',rd);
        saledeletet(rd)
        alert('recorded deleted')
        sale();
      
    };
      

    
    return(
        <>
        {isstaff ?(<>
        <div className='nav'>
            <div className='container'>
                <h1>Admin Page</h1>

            </div>
            <div className='main-cols'>
                <button onClick={ productchange}>Product</button>
                <button onClick={ userchange}>User</button>
                <button onClick={ salechange}>Sale</button>
            </div>
        </div>
        
        {productpg &&(<>
         <div className="serch-box">
            <select onChange={(e) => setOpt(e.target.value)}>
                <option>featured</option>
                <option>id</option>
                <option>cato</option>
                <option>discount</option>
                <option>sale</option>
            </select>
          <input
            className="search"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <p onClick={searchfun}>search</p>
        </div>
       
        <div className='ad-form'>
            <textarea className='ad-text' cols='10' rows="10"  value={revalu} onChange={(e) => setRevalu(e.target.value)}>
                
            </textarea>
                
                <div className='ad-divbtn'>
                <button onClick={handleProductpost}>Add</button>
                <button onClick={ handleProductupdate}>Update</button>
                <button onClick={ handleProductdelete}>Delete</button>
                </div>
       
            </div></>) }
            {userpg &&(
                <>
                 <div className="serch-box">
            <select onChange={(e) => setUopt(e.target.value)}>
                <option>id</option>
                <option>pincode</option>
                <option>noti</option>
                <option>mob</option>
            </select>
          <input
            className="search"
            placeholder="Search"
            value={uSearchInput}
            onChange={(e) => setUSearchInput(e.target.value)}
          />
          <p onClick={usearchfun}>search</p>
        </div>
       
        <div className='ad-form'>
            <textarea className='ad-text' cols='10' rows="10"  value={uRevalu} onChange={(e) => setURevalu(e.target.value)}>
                
            </textarea>
                
                <div className='ad-divbtn'>
                <button onClick={handleUserpost}>Add</button>
                <button onClick={ handleUserupdate}>Update</button>
                </div>
       
            </div>
                </>
            )}
        {salepg &&(<>
         <div className="serch-box">
            <select onChange={(e) => setSopt(e.target.value)}>
                <option>featured</option>
                <option>id</option>
                <option>cato</option>
                <option>discount</option>
                <option>sale</option>
            </select>
          <input
            className="search"
            placeholder="Search"
            value={SSearchInput}
            onChange={(e) => setSSearchInput(e.target.value)}
          />
          <p onClick={salesearchfun}>search</p>
        </div>
       
        <div className='ad-form'>
            <textarea className='ad-text' cols='10' rows="10"  value={sRevalu} onChange={(e) => setSRevalu(e.target.value)}>
                
            </textarea>
                
                <div className='ad-divbtn'>
                <button onClick={handleSalepost}>Add</button>
                <button onClick={ handleSaleupdate}>Update</button>
                <button onClick={ handleSaledelete}>Delete</button>
                </div>
       
            </div></>) }
            

        </>):(
            <>  
        <div className='nav'>
            <div className='container'>
                <h1>Page Not Available</h1>

            </div>
            
        </div>
        </>
        )}</>
    )
}