
// TODO: Flesh out form state code
const [formData, setFormData] = useState({deviceName:"", typeName:""});
const [addDevice, {data}] = useMutation(ADD_DEVICE);

const handleSubmit = function() {
	// Using the mutation function addDevice
	addDevice({variables:{

        name: formData.deviceName,
        type: formData.typeName,
		
		settings: {
		//TODO: Match over the resolver input properties and state values
		}
	}
	})

	// So useQuery will rerun and rerender the page
	refetch();
}


<form onSubmit={(e)=>{ e.preventDefault(); handleSubmit()  }

----


// You have a state of the room that JSX depends on
const {loading, error, data, refetch} = useQuery(GET_ROOM)

...

return {
	// Do the ternary operator or the short circuit with && for loading vs loaded

	{{data}}
	
}
