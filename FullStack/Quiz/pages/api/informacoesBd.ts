const host = process.env.NEXT_PUBLIC_HOST, user = process.env.NEXT_PUBLIC_USER, password = process.env.NEXT_PUBLIC_PASSWORD, database = process.env.NEXT_PUBLIC_DATABASE

export default function InformacoesBd(){
    return {'host':host, 'user':user,'password':password, 'database':database}
}