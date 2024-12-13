import "./App.css";
import Customer from "./components/Customer";

const customers = [
  {
    id: "1",
    image:
      "https://media.licdn.com/dms/image/v2/D4D03AQGaishnSDUgDQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1675805436538?e=1739404800&v=beta&t=dup3UpTmUqdY9aAnZ8WitM-Extu3jLSFYlG5Z7anAPA",
    name: "Hyoan Moon",
    birthday: "990204",
    gender: "Women",
    job: "Student",
  },
  {
    id: "2",
    image:
      "https://preview.redd.it/dztoznt0rvr31.jpg?auto=webp&s=dda057ae335d4a23d6813bd4e9214335491586e7",
    name: "Jennie",
    birthday: "960204",
    gender: "Women",
    job: "Singer",
  },
  {
    id: "3",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Blackpink_Ros%C3%A9_Rimowa_1.jpg/220px-Blackpink_Ros%C3%A9_Rimowa_1.jpg",
    name: "Rosie",
    birthday: "970204",
    gender: "Women",
    job: "Singer",
  },
];

function App() {
  return (
    <div>
      {customers.map((customer) => {
        return (
          <Customer
            key={customer.id}
            id={customer.id}
            image={customer.image}
            name={customer.name}
            birthday={customer.birthday}
            gender={customer.gender}
            job={customer.job}
          />
        );
      })}
    </div>
  );
}

export default App;
