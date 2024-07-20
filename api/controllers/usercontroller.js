export const getUsers = async (req, res) => {
 try{
    res.status(202).json({ message:" succes"})
 }catch(err) {
    console.log(err);
    res.status(501).json({ message: "Failed to get User"})
 }
}

export const getUser = async (req, res) => {
   
    try{

    }catch(err) {
       console.log(err);
       res.status(501).json({ message: "Failed to get User"})
    }
}

export const UpdateUser = async (req, res) => {
    try{

    }catch(err) {
       console.log(err);
       res.status(501).json({ message: "Failed to update User"})
    }
}

export const deleteUser = async (req, res) => {
    try{

    }catch(err) {
       console.log(err);
       res.status(501).json({ message: "Failed to delete User"})
    }
}