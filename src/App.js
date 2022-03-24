import React, {useEffect, useMemo, useRef, useState} from 'react';
import {FiSearch} from "react-icons/fi"
import "./app.scss";
import AOS from "aos"
import "aos/dist/aos.css"
import {fetchWeather} from "./API/api";

const App = () => {
	const date = new Date()
		const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const months= ["January","February","March","April","May","June","July",
		"August","September","October","November","December"];
		const [value,setValue]=useState("")
		const [data,setData]=useState([])
		const [country,setCountry]=useState("Uzbekistan");
		const searchHamdle = () => {
			console.log("Handle")
			fetchWeather(value)
				.then(res=> {
					setData(res)
				})
				.catch((e)=>console.error(e))
			setTimeout(()=>{
					setValue("")
			},1000)
	}
	const onChange = (e) => {
	  setValue(e.target.value)
	}
		useEffect(()=>{
			fetchWeather(country)
				.then(res=> {
					setData(res)
				})
				.catch((e)=>console.error(e))
			AOS.init({
			offset: 200,
			duration: 600,
			easing: 'ease-in-sine',
			delay: 100,
		});
			console.log("effect")
	},[country])
	const bgImg = () => {
		const icon = data.weather && data.weather[0].icon
		console.log(icon)
		switch (icon) {
			case "01d": {
				return  "main bg_img_sun "
			}
			case "50d": {
				return  "main bg_img_biyn "
			}
			case "02d": {
				return  "main bg_img_sun_cloud "
			}
			case "09d": {
				return  "main bg_img_rain "
			}
			case "04d": {
				return  "main bg_img_cloud "
			}
			case "01n": {
				return  "main bg_img_night "
			}
			default : return  "main"
		}
	}
	console.log(bgImg())
	return (
		<section className={bgImg()}>
				<div className="app">
					<div className="row_app">
							<div data-aos="fade-right"   className="column_app">
									<div   className="weather_info">
												<div className="temperatura">
													<h4>{data.main && Math.round(data.main.temp)}°</h4>
												</div>
												<div className="country_title">
													<h4>{data.name}</h4>
													<p>{date.getHours()}:{date.getMinutes()<10 ? `0${date.getMinutes()}`:date.getMinutes()} - {days[date.getDay()]} , {date.getDate()} {months[date.getMonth()]} {date.getFullYear()}</p>
												</div>
												<div className="cloudy">
												<span>
												{data.weather &&	<img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt=""/>}
												</span>
												</div>
									</div>
							</div>
							<div data-aos="fade-left"  className="column_app" >
									<div className="search_panel">
										<input type="text" value={value} onKeyDown={(e)=>{e.key ==="Enter"&&searchHamdle()}} onChange={onChange} placeholder="Another location"/>
										<button onClick={searchHamdle} type="button" ><FiSearch/></button>
									</div>
									<div className="center_panel">
										<div className="country_panel">
											<ul>
												<li>
													<button className="active" onClick={()=>setCountry("Toshkent")} >Toshkent</button>
												</li>
												<li>
													<button onClick={()=>setCountry("Samarqand")} >Samarqand</button>
												</li>
												<li>
													<button onClick={()=>setCountry("Buxoro")} >Buxoro</button>
												</li>
												<li>
													<button onClick={()=>setCountry("Qashqadaryo")} >Qashqadaryo</button>
												</li>
												<li>
													<button onClick={()=>setCountry("Navoiy")} >Navoiy</button>
												</li>
											</ul>
										</div>
										<div className="h_line"></div>
										<div className="details_panel">
											<h4>Weather Details</h4>
											<div className="details">
												<ul>
													<li><span>Cloudy</span> <span>{data.clouds&&data.clouds.all} %</span></li>
													<li><span>Himidity</span> <span>{data.main&&data.main.humidity} %</span></li>
													<li><span>Wind</span> <span>{data.wind&&data.wind.speed} m/s</span></li>
													<li><span>Rain</span> <span>{data.rain ? data.rain["1h"] : 0} mm</span></li>
												</ul>
											</div>
										</div>
									</div>

								<div className="h_line"></div>
							</div>
					</div>
			</div>
		</section>
	);
};

export default App;