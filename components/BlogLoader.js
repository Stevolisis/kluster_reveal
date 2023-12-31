import Link from "next/link";
import Image from "next/image";

export default function BlogLoader(){
  const articles=[1,2,3,4];
  let listing;

     listing=articles&&articles.map((article,i)=>{

      return(
        <Link href='#' key={i} legacyBehavior><a className='blogCon' key={i}>
        <div className='blogImg'>
              <Image 
              src='/imageLoader.png'
              layout="fill"
              blurDataURL="/favicon.io"
              placeholder="blur"
              priority
              />
        </div>
        <div className='blogInfo'>
  
        <div className="blogMetaData">
        <div style={{width:'100%',height:'10px',background:'rgba(23, 124, 101,0.4)'}}></div>
        <div></div>
        </div>
  
        <div>
        <h3 style={{width:'70%',height:'30px',background:'rgba(201, 197, 197,0.4)'}}></h3>
          <p style={{width:'100%',height:'150px',background:'rgba(201, 197, 197,0.4)'}}></p> 
        </div>
        </div>
  
        <div className='blogDataCon'>
          <div className='blogData'>
          <i style={{width:'80px',height:'20px',background:'rgba(201, 197, 197,0.4)'}}><p>.</p></i>
          <i style={{width:'80px',height:'20px',background:'rgba(201, 197, 197,0.4)'}}><p></p></i>
          </div>
          <div className='blogRead'><Link href='#'><p style={{width:'40px',height:'26px',background:'rgba(23, 124, 101,0.5)'}}></p></Link></div>
        </div>
        </a>
      </Link>

      )
    })

 

    return(
        <>
        <div className='categories'>
          {articles&&listing}
        </div>
        </>
    )
}












