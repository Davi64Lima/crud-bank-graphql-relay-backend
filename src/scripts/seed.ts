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
        publicId: "acc_001",
        userId: "user_001",
        balance: 1000.0,
      },
      {
        publicId: "acc_002",
        userId: "user_002",
        balance: 2500.5,
      },
      {
        publicId: "acc_003",
        userId: "user_003",
        balance: 750.25,
      },
      {
        publicId: "acc_004",
        userId: "user_004",
        balance: 3200.0,
      },
    ]);

    console.log("✅ Seed data created successfully!");
    console.log("📋 Created accounts:");
    accounts.forEach((account) => {
      console.log(
        `  - ${account.publicId}: R$ ${account.balance.toFixed(2)} (ID: ${
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
