export default function reducer(state = "Invalid Account", action: any) {

	switch (action.type) {

		case "ADMIN" : {
            return "This is admin acount"
        }
        case "MANAGER" : {
            return "This is manager account"
        }
		default: {
			return state;
		}
	}
}