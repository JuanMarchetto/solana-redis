import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaRedis } from "../target/types/solana_redis";
import * as web3 from "@solana/web3.js"

describe("solana-redis", () => {
  const anchorProvider = anchor.AnchorProvider.env();
  anchor.setProvider(anchorProvider);
  const program = anchor.workspace.SolanaRedis as Program<SolanaRedis>;

  it("Is initialized!", async () => {
    const key = ""
    const value = "Lorem ipsum"
      
    const [pda] = web3.PublicKey.findProgramAddressSync(
      [Buffer.from("value"), Buffer.from(key)],
      program.programId,
    )
    const tx = await program.methods.save(key, value)
    .accounts({
      value: pda,
      payer: anchorProvider.wallet.publicKey,
      systemProgram: web3.SystemProgram.programId,
    })
    .rpc();
      
    const storedValue = await program.account.value.fetch(pda)
    console.log(storedValue)
    console.log(`https://explorer.solana.com/tx/${tx}?cluster=devnet`);
  });
});
