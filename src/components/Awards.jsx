import awardsList from "@/data/AwardsList";

export default function Awards() {
 


  
  return (
    <>
      <h1>Awards!</h1>
      <br />
      <div>
        <div className="row">
          {awardsList.map((award, id) => (
            <div className="col-sm-4" key={id}>
              <div className="card border-0">
                <div className="card-body">
                  <img
                    loading="lazy"
                    src={award.photo}
                    className="card-img-top"
                    alt={award.alt}
                    style={{padding: "2rem"}}
                  />
                  <h5 className="card-title">{award.title}</h5>
                  <p className="card-text">{award.blurb}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}
