use anchor_lang::prelude::*;

declare_id!("3aEEgPbKa3QY3U65yxj4e2BBe2HbBXj4iCHJiHbnqKzU");

#[program]
pub mod solana_redis {

    use super::*;

    pub fn save(ctx: Context<Save>, key: String, value: String) -> Result<()> {
        let value_account = &mut ctx.accounts.value;
        value_account.value = value;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(key: String)]
pub struct Save<'info> {
    #[account(
        init_if_needed,
        payer = payer,
        space = 200,
        seeds = [b"value".as_ref(), key.as_ref()],
        bump
    )]
    pub value: Account<'info, Value>,
    /// CHECK:
    #[account(mut)]
    pub payer: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Value {
    pub value: String,
}
