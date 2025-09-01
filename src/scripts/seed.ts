import { connectDb } from "../db";
import { Account } from "../models";

const seedData = async () => {
  try {
    await connectDb();

    // Limpar dados existentes
    await Account.deleteMany({});

    // Criar contas de exemplo
    const accounts = await Account.create([
      {
        name: "João Silva",
        balance: 1000.0,
      },
      {
        name: "Maria Santos",
        balance: 2500.5,
      },
      {
        name: "Pedro Oliveira",
        balance: 750.25,
      },
      {
        name: "Ana Costa",
        balance: 3200.0,
      },
    ]);

    console.log("✅ Seed data created successfully!");
    console.log("📋 Created accounts:");
    accounts.forEach((account) => {
      console.log(
        `  - ${account.name}: R$ ${account.balance.toFixed(2)} (ID: ${
          account._id
        })`
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

// Executar se o arquivo for chamado diretamente
if (require.main === module) {
  seedData();
}

export { seedData };
