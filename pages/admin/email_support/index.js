import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useLoader } from "../../_app";
import { ThreeDots } from 'react-loader-spinner'
import { useRouter } from "next/router";
import Link from "next/link";

export default function AdminEmail(){
    const [subscribers,setSubscribers]=useState([])
    const [dataLoad,setdataLoad]=useState(false);
    const {setloading}=useLoader();
    const router=useRouter();
    let limit=useRef(10);
    const months=['January','February','March','April','May','June','July',
  'August','September','October','November','December'];
    
  function loadSubscribers(){
    setdataLoad(true)
    axios.get(`/api/news_letter/getSubscribers?limit=${limit.current}`)
    .then(res=>{
        let status=res.data.status;
        let data=res.data.data;
        setdataLoad(false)

        if(status==='success'){
            setSubscribers(data);
            
        }else{
            Swal.fire(
                'Error',
                 data,
                'error'
            )
        }
    }).catch(err=>{
        setdataLoad(false)
        Swal.fire(
            'Warning',
            err,
            'error'
        )
    })
  }




    function deleteSubsriber(id){
        Swal.fire({
            title: 'Are you sure?',
            text: "Confirm Delete of Subscriber",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            reverseButtons: true,
          }).then((result) => {
            if (result.isConfirmed) {
                setloading(true);
                axios.post('/api/news_letter/deleteSubscriber',{id:id})
                .then(res=>{
                   let status=res.data.status;
                   setloading(false);
                   if(status==='success'){
                    Swal.fire(
                        'Successful',
                        'Comment Deleted',
                        'success'
                    )
                    loadSubscribers()
                }else if(status==='Invalid User'){
                    router.push(`/login?next=${router.asPath}`)
                }else{
                    Swal.fire(
                        'Error Occured',
                        status,
                        'error'
                    )
                   }
                }).catch(err=>{
                    setloading(false);
                    Swal.fire(
                        'Error Occured',
                        err.message,
                        'error'
                    )
                })
            }else{
                setloading(false);
                return;
            }
          })
    }




    function loadLimitSubscribers(){
        limit.current=limit.current+10;
        loadSubscribers();
    }

    
    useEffect(()=>{
        loadSubscribers();
    },[]);

    

    return(
        <>
        <div className='mainHeading'>
            <p>Subscribers</p>
            <Link href='email_support/sendEmail'>SEND MAIL</Link>
        </div>

        <div className='adminstat3con'>
            <div className='adminstat3'>
                <div className='adminstat3info2'>
                    <table>
                    <tbody>

                        <tr>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Delete</th>
                        </tr>

                        {subscribers && subscribers.map((sub,i)=>{
                            return(
                            <tr key={i}>
                            <td>{sub.email}</td>
                            <td>{sub.day}th {months[sub.month]}, {sub.year}</td>
                            <td><button onClick={()=>deleteSubsriber(sub._id)}>Delete</button></td>
                            </tr>
                            )
                        })}

                    </tbody>
                    </table>
                </div>
            </div>
        <div className='adminmorebtn'>
        <div>
            {
            dataLoad&&<ThreeDots
            height="40" 
            width="40" 
            radius="9"
            color="#177C65" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
            />
            }
        </div>

        <button onClick={loadLimitSubscribers}>See More</button>
        </div>
        </div>
        </>
    )

}