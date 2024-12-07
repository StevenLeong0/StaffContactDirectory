
const process = require('node:process');
const express = require('express');
const cors = require('cors');

const app = express();


const PARSED_PORT = parseInt(process.argv[2]);
const PORT = isNaN(PARSED_PORT) ? 3000 : PARSED_PORT;

const STAFF = [
	{
		Id: 1,
		Name: "John Smith",
		Phone: "02 9988 2211",
		DepartmentId: 1,
		DepartmentName: "Information Communication Technology",
		Address: "1 Code Lane, Javaville NSW 0100 Australia"
	},
	{
		Id: 2,
		Name: "Sue Smith",
		Phone: "03 8899 2255",
		DepartmentId: 2,
		DepartmentName: "Finance",
		Address: "16 Bit Way Byte Cove QLD 1101 Australia"
	},
	{
		Id: 3,
		Name: "Bob O'Bits",
		Phone: "05 7788 2255",
		DepartmentId: 3,
		DepartmentName: "Marketing",
		Address: "8 Silicon Road Cloud Hills VIC 1001 Australia"
	},
	{
		Id: 4,
		Name: "Mary Blue",
		Phone: "06 4455 9988",
		DepartmentId: 2,
		DepartmentName: "Finance",
		Address: "4 Processor Boulevard Appleston NT 1010 Australia"
	},
	{
		Id: 5,
		Name: "Mick Green",
		Phone: "02 9988 1122",
		DepartmentId: 3,
		DepartmentName: "Finance",
		Address: "700 Bandwidth Street Bufferland NSW 0110 Australia"
	}
]

const ERR_MSG = (msg) => { return { reason: msg }; };

app.use(express.json());
app.use(cors());

app.get('/staff', (req, res) => {
	res.send(STAFF);
});

//fetch(.../view/1)
app.get('/view/:staffid', (req, res) => {
let noteid =parseInt(req.params.staffid)
res.send(STAFF[noteid]);
}
);

	// let noteid = parseInt(req.params.noteid);

	// if (isNaN(noteid)) 
	// 	{
	// 	res.status(400).send(ERR_MSG("noteid is not a nunber"))
	// } 
	// else 
	// {
	// 	if (noteid < 0 || noteid >= NOTES.length) 
	// 		{
	// 		res.status(400).send(ERR_MSG("noteid is not within range"))
	// 	} 
	// 	else 
	// 	{
	// 		res.status(200).send(
	// 			NOTES[noteid]
	// 		);
	// 	}
	// }
app.get('/update/:staffid', (req,res) =>{
	let noteid =parseInt(req.params.staffid)
	res.send(STAFF[noteid])
});

// app.get('/add/:staffid', (req,res) =>{
// 	let noteid =parseInt(req.params.staffid)
// 	res.send(STAFF[noteid])
// });

app.get('/add/', (req,res) => {
	res.send(STAFF);
});


app.post('/add', (req, res) => {
	let note = req.body;

	// if(note.Id !== undefined &&
	// 	note.Name !== undefined&&
	// 	note.Phone !== undefined&&
	// 	note.DepartmentId !== undefined&&
	// 	note.Address !== undefined) {
	if(
		note.Name !== undefined&&
		note.Phone !== undefined&&
		note.DepartmentName !== undefined&&
		note.Address !== undefined) {
			note.Id=STAFF.length;
		STAFF.push(
			{ 
				Id: note.Id,
				Name: note.Name,
				Phone: note.Phone,
				DepartmentName: note.DepartmentName,
				DepartmentId: note.DepartmentId,
				Address: note.Address
			});
		res.status(200).send({ reason: "Success, note added" });
	} else {
		res.status(400).send(ERR_MSG("Unable to add note, missing fields"));
	}
});


app.put('/update/:staffid', (req, res) => {
	let noteid = parseInt(req.params.staffid);
	if(isNaN(noteid)) {
		res.status(400).send(ERR_MSG("noteid is not a number"));
	} else {
		if(noteid < 0 || noteid >= STAFF.length) {
			res.status(400).send(ERR_MSG("note id is not within range"))
		} else {
			let note = req.body;
			if(note.Name !== undefined&&
				note.Phone !== undefined&&
				note.DepartmentName !== undefined&&
				note.Address !== undefined) {
					
				STAFF[noteid] = { 
					Id: note.Id,
					Name: note.Name,
					Phone: note.Phone,
					DepartmentName: note.DepartmentName,
					Address: note.Address
					};
				res.status(200).send({ reason: "Success, note updated" });
			} else {
				res.status(400)
					.send(ERR_MSG("Unable to update note, missing fields"));
			}
		}
	}

});


app.delete('/note/:noteid', (req, res) => {
	let noteid = parseInt(req.params.noteid);

	if(isNaN(noteid)) {
		res.status(400).send(ERR_MSG("noteid is not a number"));
	} else {
		if(noteid < 0 || noteid >= STAFF.length) {
			res.status(400).send(ERR_MSG("note id is not within range"))
		} else {
			STAFF.splice(noteid, 1);
			res.status(200).send({ reason: "Success, note removed" });
		}
	}
});


app.listen(PORT, () => {
	console.log('Notebook API Has Started');
});
