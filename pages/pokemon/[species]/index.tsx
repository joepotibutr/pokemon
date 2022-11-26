import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  Descriptions,
  Image,
  List,
  Space,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React from "react";
import { Pokemon } from "../../index";
import styles from "../../../styles/Home.module.css";

export const POKEMON_QUERY = gql`
  query Pokemon($search: PokemonEnum!) {
    getPokemon(pokemon: $search) {
      levellingRate
      flavorTexts {
        flavor
        game
      }
      gender {
        male
        female
      }
      sprite
      baseStats {
        attack
        defense
        hp
        specialattack
        specialdefense
        speed
      }
      types
      species
      bulbapediaPage
    }
  }
`;

const tabList = [
  {
    key: "info",
    tab: "Info",
  },
  {
    key: "stats",
    tab: "Stats",
  },
];

const PokemonDetail = () => {
  const [activeTabKey, setActiveTabKey] = React.useState<string>("info");
  const router = useRouter();

  const onTab1Change = (key: string) => {
    setActiveTabKey(key);
  };

  const { data, loading, error, fetchMore } = useQuery<{
    getPokemon: Pokemon;
  }>(POKEMON_QUERY, {
    variables: {
      search: router.query.species,
    } as {
      offset: number;
      search?: string;
    },
  });

  const contentList: Record<string, React.ReactNode> = {
    info: (
      <Card.Meta
        title={
          data
            ? data.getPokemon.species.charAt(0).toUpperCase() +
              data.getPokemon.species.slice(1)
            : ""
        }
        description={
          <Space direction="vertical">
            <Typography.Text>
              {data?.getPokemon.flavorTexts[0]?.flavor || ""}
            </Typography.Text>
            <Typography.Text strong>
              Leveling Rate: {data?.getPokemon.levellingRate}
            </Typography.Text>
            <Typography.Text strong>
              Male: {data?.getPokemon.gender.male} Female:{" "}
              {data?.getPokemon.gender.female}
            </Typography.Text>

            <ul>
              {data?.getPokemon.types.map((type) => (
                <li key={type}>{type}</li>
              ))}
            </ul>
          </Space>
        }
      />
    ),
    stats: (
      <Card.Meta
        title={
          data
            ? data.getPokemon.species.charAt(0).toUpperCase() +
              data.getPokemon.species.slice(1)
            : ""
        }
        description={
          <Descriptions bordered size="small" column={1}>
            <Descriptions.Item label="Attack">
              {data?.getPokemon.baseStats.attack}
            </Descriptions.Item>
            <Descriptions.Item label="Defense">
              {data?.getPokemon.baseStats.defense}
            </Descriptions.Item>

            <Descriptions.Item label="HP">
              {data?.getPokemon.baseStats.hp}
            </Descriptions.Item>
            <Descriptions.Item label="Special Attack">
              {data?.getPokemon.baseStats.specialattack}
            </Descriptions.Item>

            <Descriptions.Item label="Special Defense">
              {data?.getPokemon.baseStats.specialdefense}
            </Descriptions.Item>
            <Descriptions.Item label="Speed">
              {data?.getPokemon.baseStats.speed}
            </Descriptions.Item>
          </Descriptions>
        }
      />
    ),
  };

  return (
    <div className={styles.card_main}>
      <Card
        title={<>Pokedex</>}
        loading={!data || loading}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
        hoverable
        style={{ width: 400 }}
        cover={
          data ? (
            <div className={styles.image_wrapper}>
              <Image
                width={200}
                height={200}
                alt="example"
                src={data.getPokemon.sprite}
              />
            </div>
          ) : null
        }
      >
        <Button
          className={styles.back_button}
          type="text"
          onClick={() => router.back()}
        >
          Back
        </Button>
        {contentList[activeTabKey]}
      </Card>
    </div>
  );
};

export default PokemonDetail;
