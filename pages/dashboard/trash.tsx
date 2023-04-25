import { Layout } from "@/layouts/Layout";
import { checkAuth } from "@/utils/checkAuth";
import { GetServerSidePropsContext, NextPage } from "next";

import * as Api from "@/api";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/modules/Files";

interface Props {
    items: FileItem[];
}

const DashboardTrash: NextPage<Props> = ({ items }) => {
    return (
        <Layout title="Dashboard / Корзина">
            <DashboardLayout>
                <Files items={items} />
            </DashboardLayout>
        </Layout>
    );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const authProps = await checkAuth(ctx);

    if ("redirect" in authProps) {
        return authProps;
    }

    try {
        const items = await Api.files.getAll("trash");

        return {
            props: {
                items,
            },
        };
    } catch (err) {
        console.log(err);
        return {
            props: { items: [] },
        };
    }
};

export default DashboardTrash;
