import amqp from "amqplib";

export async function publishUserCreated(user) {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://gameshelf:gameshelf_local_2026@localhost:5672"
  );

  try {
    const channel = await connection.createChannel();
    await channel.assertExchange("gameshelf.events", "topic", { durable: true });

    channel.publish(
      "gameshelf.events",
      "usuario.creado",
      Buffer.from(JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email
      })),
      { persistent: true }
    );

    await channel.close();
  } finally {
    await connection.close();
  }
}
