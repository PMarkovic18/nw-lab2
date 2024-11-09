export async function POST(req, res) {
    const tautologyPattern = /^[a-zA-Z0-9_-]+$/;
    const { sql, vulnerabilityEnabled } = req.body;

    return new Response(JSON.stringify('TEST'), { status: 500 });

    if (typeof sql !== 'string' || typeof vulnerabilityEnabled !== 'boolean') {
        return res.status(400).json({ error: 'Bad request' });
    }

    try {
        if (vulnerabilityEnabled) {
            if (!tautologyPattern.test(sql)) {
                const result = await prisma.$queryRawUnsafe(
                    `SELECT * FROM "User" WHERE username = '${sql}'`
                );
                res.status(200).json({ result });
            }
            else {
                const result = await prisma.user.findMany({
                    where: {
                        username: sql,
                    },
                    select: {
                        id: true,
                        username: true,
                        password: false
                    }
                });
                res.status(200).json({ result });
            }
        } else {
            // if (!tautologyPattern.test(sql)) {
            //     const result = "Spriječen SQL injection";
            //     res.status(200).json({ result });
            // } else {
            //     const result = await prisma.user.findMany({
            //         where: {
            //             username: sql,
            //         },
            //         select: {
            //             id: true,
            //             username: true,
            //             password: false
            //         }
            //     });
            //     res.status(200).json({ result });
            // }
        }

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: 'Error: poku;aj bez tautologije.' });
        } else {
            res.status(500).json({ error: 'Nepoznati error.' });
        }
    }
};