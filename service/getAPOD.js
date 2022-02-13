class GetAPOD {
  constructor() {
    this.getRequestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
  }
  async getOneday(date) {
    const data = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=6PjLcTX7G89HHcizNH6vEWV6QP1HTV1CI4rhKlYS`,
    );
    const results = await data.json();
    return results;
  }
}

export default GetAPOD;
