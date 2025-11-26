import Header from "@/components/Header";
import PlantCard from "@/components/PlantCard";
import plant1 from "@/assets/plant1.jpg";
import plant2 from "@/assets/plant2.jpg";
import plant3 from "@/assets/plant3.jpg";
import plant4 from "@/assets/plant4.jpg";
import plant5 from "@/assets/plant5.jpg";
import plant6 from "@/assets/plant6.jpg";

const mockPlants = [
  {
    id: "1",
    image: plant1,
    plantName: "Monstera Deliciosa",
    description: "Mi monstera está creciendo increíblemente bien este año. ¡Miren estas hojas nuevas! 🌱",
    userName: "María García",
    userInitials: "MG",
    likes: 234,
    comments: 18,
  },
  {
    id: "2",
    image: plant2,
    plantName: "Colección de Suculentas",
    description: "Mi colección de suculentas cada vez más grande. ¿Cuál es tu favorita?",
    userName: "Carlos López",
    userInitials: "CL",
    likes: 189,
    comments: 24,
  },
  {
    id: "3",
    image: plant3,
    plantName: "Pothos Colgante",
    description: "¡Por fin encontré el lugar perfecto para mi pothos! Las enredaderas están hermosas.",
    userName: "Ana Martínez",
    userInitials: "AM",
    likes: 312,
    comments: 31,
  },
  {
    id: "4",
    image: plant4,
    plantName: "Ficus Lyrata",
    description: "Mi ficus después de 6 meses de cuidados. ¡El esfuerzo vale la pena!",
    userName: "Pedro Sánchez",
    userInitials: "PS",
    likes: 421,
    comments: 45,
  },
  {
    id: "5",
    image: plant5,
    plantName: "Familia de Cactus",
    description: "Mi estantería de cactus está completamente llena. Creo que necesito más espacio 🌵",
    userName: "Laura Rodríguez",
    userInitials: "LR",
    likes: 267,
    comments: 22,
  },
  {
    id: "6",
    image: plant6,
    plantName: "Sansevieria",
    description: "La planta perfecta para principiantes. Resistente y hermosa.",
    userName: "Javier Díaz",
    userInitials: "JD",
    likes: 156,
    comments: 12,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {mockPlants.map((plant) => (
            <PlantCard key={plant.id} {...plant} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
