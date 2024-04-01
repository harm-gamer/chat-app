const GenderCheckbox = ({oncheckboxChange,selectgender}) => {
    	return (
    		<div className='flex'>
    			<div className='form-control'>
    				<label className={`label gap-2 cursor-pointer ${selectgender === "male" ? "selected" : " "}`}>
    					<span className='label-text'>Male</span>
    					<input type='checkbox' className='checkbox border-slate-900' checked={selectgender==="male"}
						onChange={()=>oncheckboxChange("male")}/>
    				</label>
    			</div>
    			<div className='form-control'>
    				<label className={`label gap-2 cursor-pointer ${selectgender === "female" ? "selected" : " "}`}>
    					<span className='label-text'>Female</span>
    					<input type='checkbox' className='checkbox border-slate-900' 
						checked={selectgender === "female"}/>
    				</label>
    			</div>
    		</div>
    	);
    };
    export default GenderCheckbox;