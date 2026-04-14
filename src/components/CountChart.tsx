import Image from "next/image";
import prisma from "@/lib/prisma";

type ServiceInfo = {
  abreviation: string | null;
  chefServiceMatricule: string | null;
};

async function getServicesInfo(): Promise<ServiceInfo[]> {
  try {
    const services = await prisma.service.findMany({
      select: {
        abreviation: true,
        chefServiceMatricule: true,
      },
      orderBy: {
        abreviation: 'asc',
      },
    });

    return services;
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    return [];
  }
}

const CountChart = async () => {
  const services = await getServicesInfo();

  return (
    <div className="bg-white rounded-xl w-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Services et Chefs</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      {/* SERVICES LIST */}
      {services.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-400">
          <p>Aucun service trouvé</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-sm">
                  {service.abreviation || "N/A"}
                </span>
                <span className="text-xs text-gray-500">
                  Matricule Chef: {service.chefServiceMatricule || "Non assigné"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountChart;
