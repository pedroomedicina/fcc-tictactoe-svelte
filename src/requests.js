export const nextMove = async (space) => {
    try {
        const response = await fetch(`${process.env.apiUrl}/next-turn/${space}`);
        const message = await response.json();

        return message.errorMessage;
    } catch (error) {
        console.log(error, 'error connecting to server')
        return 'Error connecting'
    }
}

export const newGame = async () => {
    try {
        await fetch(`${process.env.apiUrl}/reset`);
    } catch (e) {
        console.log(e, 'error connection')
        return 'Error connecting'
    }
}