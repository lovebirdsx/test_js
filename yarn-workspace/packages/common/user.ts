export interface User {
    email: string;
    firstName?: string;
    lastName?: string;
    profilePic?: string; 
}

export function getUser(): User{
    return {
        email: 'lovebirdsx@gmail.com',
    }
}
