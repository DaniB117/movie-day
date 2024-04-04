let previousStringWithLogos = null
let previousStringWithYears = null
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const domain = 'https://api.themoviedb.org/3'
export class movieFetch{

    getProviders = 'https://api.themoviedb.org/3/watch/providers/movie?watch_region=MX'
    
    getMovies = (page, i, yearMin, yearMax, idProviders) => {
        const idArray = JSON.parse(idProviders);
        const stringWithLogos =  idArray.length === 0 ? "" : ("&with_watch_providers=" + idArray.join("%7C"))
        
        if (stringWithLogos !== previousStringWithLogos) {
          previousStringWithLogos = stringWithLogos
          page = 1
        }
        let stringWithYears = ''
        if (yearMin == 1885 && yearMax == currentYear){
          stringWithYears = ''
        } else{
          stringWithYears = `&primary_release_date.gte=${yearMin}-01-01&primary_release_date.lte=${yearMax}-12-31`
        }
        if (stringWithYears !== previousStringWithYears) {
          previousStringWithYears = stringWithYears
          page = 1
        }

        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=es-MX&page=${page}${stringWithYears}&sort_by=vote_average.desc&vote_count.gte=1000&watch_region=MX${stringWithLogos}`
        
        return url;
    }  
    
    getMovieInfo = (id) => {
      const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits%2Cvideos%2Cimages%2Cwatch%2Fproviders&language=es`

      return url
    }
}