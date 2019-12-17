
const LOAD = 'FORM_EDIT'
	const formReducer = (state = {}, action:any) => {
        switch (action.type) {
          case LOAD:
            return {
              data: action.data
            }
          default:
            return state
        }
      }
   export const load = (data:any) => ({ type: LOAD, data })

      export default formReducer